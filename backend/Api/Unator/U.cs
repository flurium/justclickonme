using Api.Configuration;
using Api.Services;
using Data.Context;
using Microsoft.EntityFrameworkCore;
using System.Dynamic;
using System.Security.Claims;
using Unator.EntityFrameworkCore;

namespace Api.Unator;

/// <summary>
/// Enter endpoint to U library
/// </summary>
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

            dynamic output = new ExpandoObject();

            if (result.AccessToken != null) output.accessToken = result.AccessToken;
            if (result.Data != null) output.data = result.Data;
            if (result.Error != null) output.error = result.Error;

            return Results.Json(output, statusCode: result.Code);
        }
        catch (Exception)
        {
            // Magic to make data null
            var output = new
            {
                error = new UError("Something unexpected happened. Please try later or contact us to get help.")
            };
            return Results.Json(output, statusCode: 500);
        }
    }

    public static async Task<IResult> Authorized<T>(
    HttpRequest req, TokenService tokenizer, Db db, Func<string, Task<UResult<T>>> handler
    ) where T : class => await CatchUnexpected(async () =>
    {
        var accessTokenClaims = await req.AccessTokenClaims(tokenizer);
        if (accessTokenClaims != null)
        {
            var uid = accessTokenClaims.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (uid == null) return U.Error(401, "You are unauthorized");
            return await handler(uid);
        }

        var refreshTokenClaims = await req.RefreshTokenClaims(tokenizer);
        if (refreshTokenClaims != null)
        {
            if (req.Host.Host != "app.justclickon.me" && req.Host.Host != "localhost")
                return U.Error(400, "Not secure request");

            if (!req.IsCsrfProtected()) return U.Error(400, "Not secure request");

            var uid = refreshTokenClaims.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            var tokenVersionString = refreshTokenClaims.FindFirst(Constants.RefreshTokenVersion)?.Value;
            if (uid == null || !int.TryParse(tokenVersionString, out int tokenVersion)) return U.Error(401, "You are unauthorized");

            var refreshTokenVersionOk = await db.Users.Exist(u => u.Id == uid && u.RefreshTokenVersion == tokenVersion);
            if (!refreshTokenVersionOk) return U.Error(401, "You are unauthorized");

            var result = await handler(uid);
            result.AccessToken = tokenizer.GenerateAccessToken(uid);
            return result;
        }

        return U.Error(401, "You are unauthorized");
    });

    private record UEmpty();

    /// <summary>
    /// Wrapper for api handlers to catch unexpected errors. Piece of magic.
    /// </summary>
    /// <param name="handler">Api handler</param>
    /// <returns>Results problem with "Something unexpected happened. Please try later or contact us to get help." message</returns>
    public static async Task<IResult> CatchUnexpected(Func<Task<UResult>> handler)
    => await CatchUnexpected<UEmpty>(async () =>
    {
        var result = await handler();
        return new(result.Code, result.Error, result.AccessToken);
    });

    // Piece of magic
    public static async Task<IResult> Authorized(
        HttpRequest req, TokenService tokenizer, Db db, Func<string, Task<UResult>> handler
    ) => await Authorized<UEmpty>(req, tokenizer, db, async (uid) =>
    {
        var result = await handler(uid);
        return new(result.Code, result.Error, result.AccessToken);
    });

    public static UResult Error(int code, string message) => new(code, error: message);

    public static UResult Authorized(string accessToken) => new(200, accessToken: accessToken);

    public static UResult<T> Data<T>(T data) where T : class => new(data);

    public static UResult Success() => new(200);
}