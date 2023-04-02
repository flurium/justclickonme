using Api.Configuration;
using Api.Services;
using System.Security.Claims;

namespace Api.Ulib;

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
}