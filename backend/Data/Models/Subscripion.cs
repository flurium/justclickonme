namespace Data.Models;

public class Subscription
{
    /// <summary>
    /// 15 not top level links
    /// </summary>
    public const string Hobby = "hobby";

    public const int HobbyLimit = 15;

    /// <summary>
    /// 100 Top links
    /// 250 Links at all
    /// </summary>
    public const string Pro = "pro";

    public const int ProLimit = 250;

    /// <summary>
    /// Unlimited usage any level
    /// </summary>
    public const string Business = "business";
}