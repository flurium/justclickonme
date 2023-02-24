﻿using Api.Configuration;
using Data.Context;
using Microsoft.EntityFrameworkCore;

namespace Api.Routers;

public static class Redirector
{
    public static void MapRedirector(this IEndpointRouteBuilder router)
    {
        router.MapGet("/{**slug}", Redirect);
    }

    public static async Task<IResult> Redirect(string slug, JustClickOnMeDbContext db)
    {
        var link = await db.Links.FirstOrDefaultAsync(l => l.Slug == slug);

        if (link == null) return Results.Redirect(Constants.NotFoundPage);

        var url = link.Destination;

        return Results.Redirect(url);
    }
}