using Api.Models;
using Api.Services;
using Api.Unator;
using Data.Context;
using Data.Models;
using Microsoft.EntityFrameworkCore;
using Unator.EntityFrameworkCore;

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
    private static async Task<IResult> All
    (
        HttpRequest req, TokenService tokenizer, Db db
    )
    => await U.Authorized<IEnumerable<LinkOutput>>(req, tokenizer, db, async uid =>
    {
        return await db.Links
            .Where(l => l.UserId == uid)
            .Select(l => new LinkOutput(l.Slug, l.Destination, l.Title, l.Description, l.CreatedDateTime))
            .QueryMany();
    });

    /// <summary>
    /// Concrete link by it's slug for authorized user
    /// </summary>
    /// <remarks>
    /// Also return access token if only refresh token was given to request.
    /// If error ocupised data field will be null, and error field will contain message and http code.
    /// </remarks>
    public static async Task<IResult> One
    (
        string slug, Db db, HttpRequest req, TokenService tokenizer
    )
    => await U.Authorized<Link>(req, tokenizer, db, async (uid) =>
    {
        var link = await db.Links.QueryOne(l => l.UserId == uid && l.Slug == slug);

        if (link == null) return U.Error(404, "Link isn't found");
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
    private static async Task<IResult> Delete
    (
        string slug, Db db, HttpRequest req, TokenService tokenizer
    )
    => await U.Authorized(req, tokenizer, db, async (uid) =>
    {
        var res = await db.DeleteOne<Link>(l => l.UserId == uid && l.Slug == slug);

        if (res == null) return U.Success();

        if (res is EntityNotFoundException) return U.Error(404, "Link isn't found");

        return U.Error(500, "Sorry! We can't save changes.");
    });

    /// <summary>
    /// Update concrete link by it's slug for authorized user
    /// </summary>
    /// <remarks>
    /// Also return access token if only refresh token was given to request.
    /// If error occupied data field will be null, and error field will contain message and http code.Sample request:
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
    private static async Task<IResult> Update
    (
        EditLinkInput input, Db db,
        HttpRequest req, TokenService tokenizer
    )
    => await U.Authorized<Link>(req, tokenizer, db, async (uid) =>
    {
        var result = await db.EditOne<Link>(
            link => link.UserId == uid && link.Slug == input.Slug,
            link =>
            {
                if (input.NewSlug != null) link.Slug = input.NewSlug;
                if (input.Destination != null) link.Destination = input.Destination;
                if (input.Description != null) link.Description = input.Description;
                if (input.Title != null) link.Title = input.Title;
            }
        );

        if (result.Data != null) return result.Data;

        if (result.Error is EntityNotFoundException) return U.Error(404, "Link isn't found");

        return U.Error(500, "Sorry! We can't save changes.");
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
    private static async Task<IResult> Create
    (
        CreateLinkInput input, SubscriptionService subscriptionService,
        Db db, HttpRequest request, TokenService tokenService
    )
    => await U.Authorized<CreateLinkOutput>(request, tokenService, db, async (uid) =>
    {
        // TODO: update the usage

        var isAllowed = await subscriptionService.IsLimitAllow(uid);
        if (!isAllowed) return U.Error(402, "You reached limit of your subscription");

        var slug = input.Slug.Trim('/').Replace(" ", "-");
        var scopeEndIndex = slug.IndexOf("/");
        if (scopeEndIndex == -1)
        {
            // TOP LEVEL link
            var owned = await db.Links.AnyAsync(l => l.Slug == slug).ConfigureAwait(false);
            if (owned) return new(409, "Slug is taken");

            var created = await db.CreateOne<Link>(new(slug, input.Destination, uid, input.Title, input.Description));

            if (created.Data != null)
            {
                return new CreateLinkOutput(
                    created.Data.Slug, created.Data.Destination, created.Data.Title,
                    created.Data.Description, created.Data.CreatedDateTime
                );
            }
        }

        var scope = slug[..scopeEndIndex];
        var withSameScope = await db.Links.QueryOne(l => l.Slug.StartsWith(scope));

        if (withSameScope != null)
        {
            if (withSameScope.UserId != uid) return U.Error(409, "Scope is taken");

            var exist = await db.Links.AnyAsync(l => l.Slug == slug).ConfigureAwait(false);
            if (exist) return U.Error(409, "Slug is taken");
        }

        var createdLink = await db.CreateOne<Link>(new(slug, input.Destination, uid, input.Title, input.Description));
        if (createdLink.Data != null)
        {
            return new CreateLinkOutput(
                createdLink.Data.Slug,
                createdLink.Data.Destination,
                createdLink.Data.Title,
                createdLink.Data.Description,
                createdLink.Data.CreatedDateTime
            );
        }

        return U.Error(500, "Sorry, we can't save changes");
    });
}