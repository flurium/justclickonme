namespace Api.Utilities
{
    public class U
    {
        public static async Task<IResult> CatchUnexpected(Func<Task<IResult>> handler)
        {
            try
            {
                return await handler();
            }
            catch (Exception)
            {
                return Results.Problem();
            }
        }
    }
}