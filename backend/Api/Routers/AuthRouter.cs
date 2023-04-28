using Api.Configuration;
using Api.Models;
using Api.Services;
using Api.Unator;
using Data.Context;
using Data.Models;
using Microsoft.AspNetCore.Identity;
using Unator.EntityFrameworkCore;

namespace Api.Routers;

public static class AuthRouter
{
    public static void MapAuth(this IEndpointRouteBuilder router)
    {
        router.MapPost("/api/auth/password", Password);

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

    private static async Task<IResult> Password
    (
        PasswordInput input, UserManager<User> userManager,
        TokenService tokenService, HttpResponse response
    )
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

            if (!res.Succeeded) return U.Error(500, "Sorry! We can't create account for you. Please try later or contact us to get help.");
        }
        else
        {
            var signed = await userManager.CheckPasswordAsync(user, input.Password);
            if (!signed) return U.Error(400, "Password is incorrect.");
        }

        var token = tokenService.GenerateAccessToken(user.Id);
        SetCookie(response, Constants.RefreshTokenCookie, tokenService.GenerateRefreshToken(user));

        return U.Authorized(token);
    });

    private static async Task<IResult> Revoke
    (
        Db db, HttpRequest req, TokenService tokenizer
    )
    => await U.Authorized(req, tokenizer, db, async uid =>
    {
        var result = await db.EditOne<User>(
            u => u.Id == uid,
            u => u.RefreshTokenVersion += 1
        );

        if (result.Data != null) U.Success();

        if (result.Error is EntityNotFoundException) return new(404, "User isn't found");

        return U.Error(500, "Sorry we can't save changes.");
    });
}