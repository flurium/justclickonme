using Api.Configuration;
using Api.Services;
using Data.Context;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace Api.Ulib;

public static class U
{
    /// <summary>
    /// Wrapper for api handlers to catch unexpected errors.
    /// </summary>
    /// <param name="handler">Api handler</param>
    /// <returns>Results problem with "Something unexpected happened. Please try later or contact us to get help." message</returns>
    public static async Task<IResult> CatchUnexpected<T>(Func<Task<UResult<T>>> handler) where T : class
    {
        try
        {
            var result = await handler();
            object output = result.AccessToken == null ? new UOutput<T>(result.Data, result.Error) : new UAuthOutput<T>(result.Data, result.Error, result.AccessToken);
            return Results.Json(output, statusCode: result.Code);
        }
        catch (Exception)
        {
            // Magic to make data null
            var output = new UOutput(new("Something unexpected happened. Please try later or contact us to get help."));
            return Results.Json(output, statusCode: 500);
        }
    }

    /// <summary>
    /// Wrapper for api handlers to catch unexpected errors.
    /// </summary>
    /// <param name="handler">Api handler</param>
    /// <returns>Results problem with "Something unexpected happened. Please try later or contact us to get help." message</returns>
    public static async Task<IResult> CatchUnexpected(Func<Task<UResult>> handler)
    {
        try
        {
            var result = await handler();
            object output = result.AccessToken == null ? new UOutput(result.Error) : new UAuthOutput(result.Error, result.AccessToken);
            return Results.Json(output, statusCode: result.Code);
        }
        catch (Exception)
        {
            // Magic to make data null
            var output = new UOutput(new("Something unexpected happened. Please try later or contact us to get help."));
            return Results.Json(output, statusCode: 500);
        }
    }

    public static async Task<IResult> Authorized<T>(
        HttpRequest req, TokenService tokenizer, JustClickOnMeDbContext db, Func<string, Task<UResult<T>>> handler
    ) where T : class => await CatchUnexpected(async () =>
    {
        var accessTokenClaims = await req.AccessTokenClaims(tokenizer);
        if (accessTokenClaims != null)
        {
            var uid = accessTokenClaims.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (uid == null) return new(401, error: "You are unauthorized");
            return await handler(uid);
        }

        var refreshTokenClaims = await req.RefreshTokenClaims(tokenizer);
        if (refreshTokenClaims != null)
        {
            var uid = refreshTokenClaims.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            var tokenVersionString = refreshTokenClaims.FindFirst(Constants.RefreshTokenVersion)?.Value;
            if (uid == null || !int.TryParse(tokenVersionString, out int tokenVersion)) return new(401, error: "You are unauthorized");

            var refreshTokenVersionOk = await db.Users.AnyAsync(u => u.Id == uid && u.RefreshTokenVersion == tokenVersion);
            if (!refreshTokenVersionOk) return new(401, error: "You are unauthorized");

            var result = await handler(uid);
            result.AccessToken = tokenizer.GenerateAccessToken(uid);
            return result;
        }

        return new(401, error: "You are unauthorized");
    });

    // Fully exactly like with T, but I don't know how to make 1 from them
    public static async Task<IResult> Authorized(
        HttpRequest req, TokenService tokenizer, JustClickOnMeDbContext db, Func<string, Task<UResult>> handler
    ) => await CatchUnexpected(async () =>
    {
        var accessTokenClaims = await req.AccessTokenClaims(tokenizer);
        if (accessTokenClaims != null)
        {
            var uid = accessTokenClaims.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (uid == null) return new(401, error: "You are unauthorized");
            return await handler(uid);
        }

        var refreshTokenClaims = await req.RefreshTokenClaims(tokenizer);
        if (refreshTokenClaims != null)
        {
            var uid = refreshTokenClaims.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            var tokenVersionString = refreshTokenClaims.FindFirst(Constants.RefreshTokenVersion)?.Value;
            if (uid == null || !int.TryParse(tokenVersionString, out int tokenVersion)) return new(401, error: "You are unauthorized");

            var refreshTokenVersionOk = await db.Users.AnyAsync(u => u.Id == uid && u.RefreshTokenVersion == tokenVersion);
            if (!refreshTokenVersionOk) return new(401, error: "You are unauthorized");

            var result = await handler(uid);
            result.AccessToken = tokenizer.GenerateAccessToken(uid);
            return result;
        }

        return new(401, error: "You are unauthorized");
    });

    public static UResult<T> Error<T>(int code, string message) where T : class => new(code, error: message);

    public static UResult Error(int code, string message) => new(code, error: message);

    public static UResult Authorized(string accessToken) => new(200, accessToken: accessToken);

    public static UResult<T> Data<T>(T data) where T : class => new(data);

    public static UResult Success() => new(200);
}