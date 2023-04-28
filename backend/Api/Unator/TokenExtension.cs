using Api.Configuration;
using Api.Services;
using Microsoft.Extensions.Primitives;
using System.Security.Claims;

namespace Api.Unator;

public static class TokenExtension
{
    public static async Task<ClaimsIdentity?> AccessTokenClaims(this HttpRequest request, TokenService tokenizer)
    {
        var token = GetAccessToken(request);
        if (token == null) return null;
        var verificationResult = await tokenizer.VerifyAccessToken(token);
        if (verificationResult == null || !verificationResult.IsValid) return null;
        return verificationResult.ClaimsIdentity;
    }

    public static async Task<ClaimsIdentity?> RefreshTokenClaims(this HttpRequest request, TokenService tokenizer)
    {
        var token = GetRefreshToken(request);
        if (token == null) return null;
        var verificationResult = await tokenizer.VerifyRefreshToken(token);
        if (verificationResult == null || !verificationResult.IsValid) return null;
        return verificationResult.ClaimsIdentity;
    }

    private static string? GetAccessToken(HttpRequest request)
    {
        string? accessToken;
        try { accessToken = request.Headers.Authorization.ToString().Split(" ")[1]; }
        catch { accessToken = null; }
        return accessToken;
    }

    private static string? GetRefreshToken(HttpRequest request)
    {
        request.Cookies.TryGetValue(Constants.RefreshTokenCookie, out string? refreshToken);
        return refreshToken;
    }

    private static string? GetCsrfCookie(this HttpRequest request)
    {
        request.Cookies.TryGetValue(Constants.CsrfTokenCookie, out string? cookie);
        return cookie;
    }

    private static string? GetCsrfHeader(this HttpRequest request)
    {
        request.Headers.TryGetValue(Constants.CsrfTokenHeader, out StringValues header);
        return header;
    }

    public static bool IsCsrfProtected(this HttpRequest request)
    {
        var cookie = GetCsrfCookie(request);
        if (cookie == null) return false;

        var header = GetCsrfHeader(request);
        if (header == null) return false;

        return cookie == header;
    }
}