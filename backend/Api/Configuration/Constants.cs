namespace Api.Configuration
{
    public static class Constants
    {
        public const string RefreshTokenCookie = "freshme";
        public const string RefreshTokenVersion = "refreshTokenVersion";
        public const string CsrfTokenCookie = "iEvenDontKnowWhatItIs";
        public const string CsrfTokenHeader = "x-secrets-about-your-cat";

        public const string NotFoundPage = "https://www.justclickon.me/not-found";

        public const string CredentialsCors = "CredentialsCors";
        public const string SubscriptionClaimName = "subscriptionClaim";
    }
}