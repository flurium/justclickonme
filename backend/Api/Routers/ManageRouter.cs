using Api.Models;
using Api.Services;
using Api.Ulib;
using Data.Context;
using Data.Models;
using Microsoft.EntityFrameworkCore;

namespace Api.Routers;

public static class ManageRouter
{
    public static void MapLinks(this IEndpointRouteBuilder router)
    {
        router.MapGet("/api/links", All);
        router.MapGet("/api/links/{slug:required}", One);
        router.MapPost("/api/links", Create);
        router.MapDelete("/api/links/{slug:required}", Delete);
        router.MapPut("/api/links", Update);
    }

    /// <summary>
    /// All links for authorized user
    /// </summary>
    /// <remarks>
    /// Also return access token if only refresh token was given to request.
    /// If error ocupised data field will be null, and error field will contain message and http code.
    /// </remarks>
    private static async Task<IResult> All(HttpRequest req, TokenService tokenizer, JustClickOnMeDbContext db)
    => await U.Authorized<IEnumerable<LinkOutput>>(req, tokenizer, db, async uid =>
    {
        return await db.Links
            .Where(l => l.UserId == uid)
            .Select(l => new LinkOutput(l.Slug, l.Destination, l.Title, l.Description, l.CreatedDateTime))
            .ToListAsync();
    });

    /// <summary>
    /// Concrete link by it's slug for authorized user
    /// </summary>
    /// <remarks>
    /// Also return access token if only refresh token was given to request.
    /// If error ocupised data field will be null, and error field will contain message and http code.
    /// </remarks>
    public static async Task<IResult> One(string slug, JustClickOnMeDbContext db, HttpRequest req, TokenService tokenizer)
    => await U.Authorized<Link>(req, tokenizer, db, async (uid) =>
    {
        var link = await db.Links
            .FirstOrDefaultAsync(l => l.UserId == uid && l.Slug == slug);

        if (link == null) return new(404, "Link isn't found");
        return link;
    });

    /// <summary>
    /// Delete concrete link
    /// </summary>
    /// <remarks>
    /// Also return access token if only refresh token was given to request.
    /// If error ocupised data field will be null, and error field will contain message and http code.
    /// Sample request:
    ///
    ///     DELETE /api/links/paragoda/logo
    ///
    /// </remarks>
    private static async Task<IResult> Delete(string slug, JustClickOnMeDbContext db, HttpRequest req, TokenService tokenizer)
    => await U.Authorized(req, tokenizer, db, async (uid) =>
    {
        var link = await db.Links.FirstOrDefaultAsync(l => l.UserId == uid && l.Slug == slug);
        if (link == null) return new(404, "Link isn't found");

        try
        {
            db.Links.Remove(link);
            var res = await db.SaveChangesAsync();
            return U.Success();
        }
        catch
        {
            return new(500, "Sorry! We can't save changes.");
        }
    });

    /// <summary>
    /// Update concrete link by it's slug for authorized user
    /// </summary>
    /// <remarks>
    /// Also return access token if only refresh token was given to request.
    /// If error ocupised data field will be null, and error field will contain message and http code.Sample request:
    /// Sample request:
    ///
    ///     PUT /api/links
    ///     {
    ///        "slug": "paragoda/logo",
    ///        "newSlug": "paragoda/icon"
    ///        "destination": "https://avatars.githubusercontent.com/u/103936719?s=400&amp;u=92045d10ddac6083ed45b412f8758be99677b9d7&amp;v=4",
    ///        "title": "Paragoda organization logo",
    ///        "description": null
    ///     }
    ///
    /// </remarks>
    private static async Task<IResult> Update(EditLinkInput input, JustClickOnMeDbContext db, HttpRequest req, TokenService tokenizer) => await Ulib.U.Authorized<Link>(req, tokenizer, db, async (uid) =>
    {
        var link = await db.Links.FirstOrDefaultAsync(l => l.UserId == uid && l.Slug == input.Slug);
        if (link == null) return new(404, "Link isn't found");

        if (input.NewSlug != null) link.Slug = input.NewSlug;
        if (input.Destination != null) link.Destination = input.Destination;
        if (input.Descripiton != null) link.Description = input.Descripiton;
        if (input.Title != null) link.Title = input.Title;

        try
        {
            await db.SaveChangesAsync();
            return link;
        }
        catch
        {
            return new(500, "Sorry! We can't save changes.");
        }
    });

    /// <summary>
    /// Create new link for authorized user
    /// </summary>
    /// <remarks>
    /// Checks subscription limit.
    /// Also return access token if only refresh token was given to request.
    /// If error ocupised data field will be null, and error field will contain message and http code.
    /// Sample request:
    ///
    ///     POST /api/links
    ///     {
    ///        "slug": "paragoda/logo",
    ///        "destination": "https://avatars.githubusercontent.com/u/103936719?s=400&amp;u=92045d10ddac6083ed45b412f8758be99677b9d7&amp;v=4",
    ///        "title": "Paragoda organization logo",
    ///        "description": "Link for logo is taken from GitHub Paragoda account picture"
    ///     }
    ///
    /// </remarks>
    private static async Task<IResult> Create(
        CreateLinkInput input, SubscriptionService subscriptionService, JustClickOnMeDbContext db, HttpRequest request, TokenService tokenService
    ) => await U.Authorized<Link>(request, tokenService, db, async (uid) =>
    {
        // TODO: update the usage

        var isAllowed = await subscriptionService.IsLimitAllow(uid);
        if (!isAllowed) return new(402, error: "You reached limit of your subscription");

        var slug = input.Slug.Trim('/').Replace(" ", "-");
        var scopeEndIndex = slug.IndexOf("/");
        if (scopeEndIndex == -1)
        {
            // TOP LEVEL link
            var owned = await db.Links.AnyAsync(l => l.Slug == slug);
            if (owned) return new(409, error: "Slug is taken");
            var created = await db.Links.AddAsync(new(slug, input.Destination, uid, input.Title, input.Description));
            await db.SaveChangesAsync();
            return new(200, data: created.Entity);
        }

        var scope = slug[..scopeEndIndex];
        var withSameScope = await db.Links.FirstOrDefaultAsync(l => l.Slug.StartsWith(scope));

        if (withSameScope != null)
        {
            if (withSameScope.UserId != uid) return new(409, error: "Scope is taken");

            var exist = await db.Links.AnyAsync(l => l.Slug == slug);
            if (exist) return new(409, error: "Slug is taken");
        }

        try
        {
            var res = await db.Links.AddAsync(new(slug, input.Destination, uid, input.Title, input.Description));
            await db.SaveChangesAsync();
            return res.Entity;
        }
        catch
        {
            return new(500, "Sorry! We can't save changes.");
        }
    });
}