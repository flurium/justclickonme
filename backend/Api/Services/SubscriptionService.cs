using Data.Context;
using Data.Models;
using Microsoft.EntityFrameworkCore;

namespace Api.Services
{
    public class SubscriptionService
    {
        private readonly JustClickOnMeDbContext db;

        public SubscriptionService(JustClickOnMeDbContext db)
        {
            this.db = db;
        }

        /// <param name="subscripiton">Should be used const string from Subscription class</param>
        /// <returns>True if subscrition limit allow to add new link</returns>
        public async Task<bool> IsLimitAllow(string uid)
        {
            var user = await db.Users
                //.Select(u => new { u.Id, u.Subscription, u.SubscriptionDate })
                .FirstOrDefaultAsync(u => u.Id == uid);
            if (user == null) return false;

            if (user.Subscription == Subscription.Business) return true;

            var usageLimit = user.Subscription == Subscription.Pro ? 250 : 15;

            if (user.Subscription == Subscription.Pro)
            {
                usageLimit = 250;
            }
            else if (user.Subscription == Subscription.Hobby)
            {
                usageLimit = 15;
                // Renew hobby subscription
                if ((DateTime.Now - user.SubscriptionDate).Days > 30)
                {
                    user.SubscriptionDate = DateTime.Now;
                    await db.SaveChangesAsync();
                }
            }

            var usedThisMonth = await db.Links.CountAsync(l => l.UserId == uid && l.CreatedDateTime >= user.SubscriptionDate);
            return usedThisMonth < usageLimit;
        }
    }
}