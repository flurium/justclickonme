using Data.Models;
using System.Security.Claims;

namespace Api.Utilities
{
    public class U
    {
        /// <summary>
        /// Wrapper for api handlers to catch unexpected errors.
        /// </summary>
        /// <param name="handler">Api handler</param>
        /// <returns>Results problem with "Something unexpected happened. Please try later or contact us to get help." message</returns>
        public static async Task<IResult> CatchUnexpected(Func<Task<IResult>> handler)
        {
            try
            {
                return await handler();
            }
            catch (Exception)
            {
                return Results.Problem("Something unexpected happened. Please try later or contact us to get help.");
            }
        }

        public static async Task<IResult> Authorized(ClaimsPrincipal claims, Func<string, Task<IResult>> handler)
        {
            try
            {
                var uid = claims.FindFirstValue(ClaimTypes.NameIdentifier);

                if (uid == null) return Results.Unauthorized();

                return await handler(uid);
            }
            catch (Exception)
            {
                return Results.Problem("Something unexpected happened. Please try later or contact us to get help.");
            }
        }
    }
}