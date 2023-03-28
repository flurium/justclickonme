using Microsoft.AspNetCore.Identity;

namespace Data.Models;

public class User : IdentityUser
{
    public int RefreshTokenVersion { get; set; } = 0;

    // SUBSCRIPTION
    public string Subscription { get; set; } = Models.Subscription.Hobby;

    public DateTime SubscriptionDate { get; set; } = DateTime.UtcNow;

    /// <summary>
    ///
    /// </summary>
    public int LinkCountUsedThisPeriod { get; set; } = 0;

    public IReadOnlyCollection<Link> Links { get; set; } = default!;
}