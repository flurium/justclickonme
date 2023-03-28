using Api.Configuration;
using Api.Models;
using Api.Services;
using Api.Utilities;
using Data.Context;
using Data.Models;
using Microsoft.EntityFrameworkCore;
using Npgsql.Replication.PgOutput.Messages;
using System.Security.Claims;

namespace Api.Routers;

public static class ManageRouter
{
    public static void MapLinks(this IEndpointRouteBuilder router)
    {
        router.MapGet("/api/links", All).RequireAuthorization();
        router.MapGet("/api/links/{slug:required}", One).RequireAuthorization();
        router.MapPost("/api/links", Create).RequireAuthorization();
        router.MapDelete("/api/links/{slug:required}", Delete).RequireAuthorization();
        router.MapPut("/api/links", Update).RequireAuthorization();
    }

    private static async Task<IResult> All(ClaimsPrincipal claims, JustClickOnMeDbContext db, HttpRequest req) => await U.Authorized(claims, async (uid) =>
    {
        var links = await db.Links
            .Where(l => l.UserId == uid)
            .Select(l => new LinkOutput(l.Slug, l.Destination, l.Title, l.Description, l.CreatedDateTime))
            .ToListAsync();

        return Results.Ok(links);
    });

    // MAYBE not nessasary
    public static async Task<IResult> One(string slug, JustClickOnMeDbContext db, ClaimsPrincipal claims) => await U.Authorized(claims, async (uid) =>
    {
        var link = await db.Links
            .FirstOrDefaultAsync(l => l.UserId == uid && l.Slug == slug);

        return Results.Ok(link);
    });

    private static async Task<IResult> Delete(string slug, JustClickOnMeDbContext db, ClaimsPrincipal claims) => await U.Authorized(claims, async (uid) =>
    {
        var link = await db.Links.FirstOrDefaultAsync(l => l.UserId == uid && l.Slug == slug);
        if (link == null) return Results.NotFound();

        db.Links.Remove(link);
        await db.SaveChangesAsync();

        return Results.Ok();
    });

    private static async Task<IResult> Update(EditLinkInput input, JustClickOnMeDbContext db, ClaimsPrincipal claims) => await U.Authorized(claims, async (uid) =>
    {
        var link = await db.Links.FirstOrDefaultAsync(l => l.UserId == uid && l.Slug == input.Slug);
        if (link == null) return Results.NotFound(input.Slug);

        if (input.NewSlug != null) link.Slug = input.NewSlug;
        if (input.Destination != null) link.Destination = input.Destination;
        if (input.Descripiton != null) link.Description = input.Descripiton;
        if (input.Title != null) link.Title = input.Title;

        await db.SaveChangesAsync();

        return Results.Ok(link);
    });

    // A lot of SHIT
    private static async Task<IResult> Create(CreateLinkInput input, SubscriptionService subscriptionService,
    ClaimsPrincipal claims, JustClickOnMeDbContext db) => await U.Authorized(claims, async (uid) =>
    {
        // TODO: update the usage

        var isAllowed = await subscriptionService.IsLimitAllow(uid);
        if (!isAllowed) return Results.BadRequest("You reached limit of your subscription");

        var slug = input.Slug.Trim('/').Replace(" ", "-");
        var scopeEndIndex = slug.IndexOf("/");
        if (scopeEndIndex == -1)
        {
            // TOP LEVEL link
            var owned = await db.Links.AnyAsync(l => l.Slug == slug);
            if (owned) return Results.Conflict("Slug is taken");
            var created = await db.Links.AddAsync(new(slug, input.Destination, uid, input.Title, input.Description));
            await db.SaveChangesAsync();
        }
        else
        {
            var scope = slug[..scopeEndIndex];
            var withSameScope = await db.Links.FirstOrDefaultAsync(l => l.Slug.StartsWith(scope));

            if (withSameScope == null)
            {
                var res = await db.Links.AddAsync(new(slug, input.Destination, uid, input.Title, input.Description));
                await db.SaveChangesAsync();
            }
            else if (withSameScope.UserId == uid)
            {
                var exist = await db.Links.AnyAsync(l => l.Slug == slug);
                if (exist) return Results.Conflict("Slug exists");

                var res = await db.Links.AddAsync(new(slug, input.Destination, uid, input.Title, input.Description));
                await db.SaveChangesAsync();
            }
            else
            {
                return Results.Conflict("Scope is taken");
            }
        }

        return Results.Ok();
    });
}