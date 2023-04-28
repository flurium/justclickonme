using Data.Context;
using Microsoft.EntityFrameworkCore;

namespace Api.Routers;

public static class RedirectRouter
{
    public static void MapRedirector(this IEndpointRouteBuilder router)
    {
        router.MapGet("/{**slug}", Redirect);
    }

    public static async Task<IResult> Redirect(string slug, Db db)
    {
        var link = await db.Links
            .Where(l => l.Slug == slug)
            .Select(l => l.Destination)
            .FirstOrDefaultAsync();

        // it's accually hack to get users if page not found, but may be it's bad ux
        if (link == null) return Results.Redirect("https://app.justclickon.me");

        return Results.Redirect(link);
    }
}