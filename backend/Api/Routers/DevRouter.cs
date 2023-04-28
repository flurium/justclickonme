using Data.Context;

namespace Api.Routers;

public static class DevRouter
{
    public static void MapDev(this IEndpointRouteBuilder router)
    {
        router.MapGet("/api/dev", GetDevTokens);
    }

    public static Task<IResult> GetDevTokens(Db db)
    {
        return Task.FromResult(Results.Ok());
    }
}