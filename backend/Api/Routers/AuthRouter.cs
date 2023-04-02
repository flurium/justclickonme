using Api.Configuration;
using Api.Models;
using Api.Services;
using Api.Ulib;
using Data.Context;
using Data.Models;
using Google.Apis.Auth;
using Microsoft.AspNetCore.Identity;

namespace Api.Routers;

public static class AuthRouter
{
    public static void MapAuth(this IEndpointRouteBuilder router)
    {
        router.MapPost("/api/auth/password", Password);
        router.MapPost("/api/auth/google", Google);
        //router.MapGet("/api/auth/refresh", Refresh);

        // now for testing
        router.MapPost("/api/auth/revoke", Revoke);
    }

    private static void SetCookie(HttpResponse response, string key, string value)
    {
        response.Cookies.Append(key, value, new()
        {
            HttpOnly = true,
            SameSite = SameSiteMode.None,
            Secure = true
        });
    }

    private static async Task<IResult> Password(PasswordInput input, UserManager<User> userManager, TokenService tokenService, HttpResponse response)
    => await U.CatchUnexpected(async () =>
    {
        var user = await userManager.FindByEmailAsync(input.Email);

        if (user == null)
        {
            user = new()
            {
                UserName = input.Email,
                Email = input.Email,
            };
            var res = await userManager.CreateAsync(user, input.Password);

            if (!res.Succeeded) return new(500, "Sorry! We can't create account for you. Please try later or contact us to get help.");
        }
        else if (user.PasswordHash == null)
        {
            return new(409, "You should sign in with provider like: Google, ...");
        }
        else
        {
            var signed = await userManager.CheckPasswordAsync(user, input.Password);
            if (!signed) return new(400, "Password is incorrect.");
        }

        var token = tokenService.GenerateAccessToken(user.Id);
        SetCookie(response, Constants.RefreshTokenCookie, tokenService.GenerateRefreshToken(user));

        return U.Authorized(token);
    });

    private static async Task<IResult> Google(GoogleInput input, UserManager<User> userManager, TokenService tokenService, HttpResponse response)
    => await U.CatchUnexpected(async () =>
    {
        var validPayload = await GoogleJsonWebSignature.ValidateAsync(input.IdToken);

        var user = await userManager.FindByEmailAsync(validPayload.Email);
        if (user == null)
        {
            user = new()
            {
                Email = validPayload.Email,
                UserName = validPayload.Email,
                EmailConfirmed = validPayload.EmailVerified,
            };

            var res = await userManager.CreateAsync(user);
            if (!res.Succeeded) return new(500, "Sorry! We can't create account for you.");
        }

        var token = tokenService.GenerateAccessToken(user.Id);
        SetCookie(response, Constants.RefreshTokenCookie, tokenService.GenerateRefreshToken(user));
        return U.Authorized(token);
    });

    /* Deprecated
    private static async Task<IResult> Refresh(HttpRequest request, TokenService tokenService, UserManager<User> userManager, HttpResponse response)
    {
        try
        {
            var refreshToken = request.Cookies[Constants.RefreshTokenCookie];
            if (refreshToken == null) return Results.BadRequest();

            var tokenValidation = await tokenService.VerifyRefreshToken(refreshToken);
            if (!tokenValidation.IsValid) return Results.BadRequest();

            var uid = tokenValidation.ClaimsIdentity.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (uid == null) return Results.BadRequest();

            var user = await userManager.FindByIdAsync(uid);
            if (user == null) return Results.NotFound();

            var refreshClaim = tokenValidation.ClaimsIdentity.FindFirst(Constants.RefreshTokenVersion);
            if (refreshClaim == null) return Results.BadRequest();

            var refreshTokenVersion = int.Parse(refreshClaim.Value);

            if (user.RefreshTokenVersion != refreshTokenVersion) return Results.Unauthorized();

            var accessToken = tokenService.GenerateAccessToken(user.Id);
            SetCookie(response, Constants.RefreshTokenCookie, tokenService.GenerateRefreshToken(user));
            return Results.Ok(new
            {
                accessToken
            });
        }
        catch
        {
            return Results.BadRequest();
        }
    }
    */

    private static async Task<IResult> Revoke(JustClickOnMeDbContext db, HttpRequest req, TokenService tokenizer)
    => await U.Authorized(req, tokenizer, db, async uid =>
    {
        var user = db.Users.FirstOrDefault(u => u.Id == uid);
        if (user == null) return new(404, "User isn't found");

        user.RefreshTokenVersion += 1;
        await db.SaveChangesAsync();

        return U.Success();
    });
}