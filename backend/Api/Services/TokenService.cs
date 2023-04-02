﻿using Api.Configuration;
using Api.Helpers;
using Data.Models;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Api.Services;

public class TokenService
{
    private readonly Secrets secrets;

    public TokenService(IOptions<Secrets> secrets)
    {
        this.secrets = secrets.Value;
    }

    public string GenerateAccessToken(string uid)
    {
        var claims = new List<Claim>
        {
            new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
            new Claim(ClaimTypes.NameIdentifier, uid)
        };

        var expiration = DateTime.UtcNow.AddMinutes(30);

        return GenerateToken(claims, expiration, secrets.JwtAccessSecret);
    }

    public string GenerateRefreshToken(User user)
    {
        var claims = new List<Claim>
        {
            new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
            new Claim(Constants.RefreshTokenVersion, user.RefreshTokenVersion.ToString()),
            new Claim(ClaimTypes.NameIdentifier, user.Id),
        };

        var expiration = DateTime.UtcNow.AddDays(30);

        return GenerateToken(claims, expiration, secrets.JwtRefreshSecret);
    }

    public async Task<TokenValidationResult> VerifyRefreshToken(string token) => await VerifyToken(token, secrets.JwtRefreshSecret);

    public async Task<TokenValidationResult> VerifyAccessToken(string token) => await VerifyToken(token, secrets.JwtAccessSecret);

    private async Task<TokenValidationResult> VerifyToken(string token, string secret)
    {
        var handler = new JwtSecurityTokenHandler();

        var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secret));

        var validations = new TokenValidationParameters
        {
            ValidIssuer = secrets.JwtIssuer,
            IssuerSigningKey = securityKey,
            ValidateIssuer = true,
            ValidateIssuerSigningKey = true,
            ValidateAudience = false,
            ValidateLifetime = true,
        };

        return await handler.ValidateTokenAsync(token, validations);
    }

    private string GenerateToken(List<Claim> claims, DateTime expiration, string secret)
    {
        var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secret));
        var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

        var jwt = new JwtSecurityToken(
          issuer: secrets.JwtIssuer,
          expires: expiration,
          claims: claims,
          signingCredentials: credentials
        );

        var handler = new JwtSecurityTokenHandler();
        return handler.WriteToken(jwt);
    }
}