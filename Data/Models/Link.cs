namespace Data.Models;

public class Link
{
    public Link(string slug, string destination, string userId, string title = "", string description = "")
    {
        Slug = slug;
        Destination = destination;
        UserId = userId;
        Title = title;
        Description = description;
    }

    public string Slug { get; set; }
    public string Destination { get; set; }

    public string Description { get; set; } = string.Empty;
    public string Title { get; set; } = string.Empty;

    //public string? Password { get; set; }
    //public DateTime? ExpireTime { get; set; }
    //public ulong ClicksCount { get; set; } = 0;

    public string UserId { get; set; }
    public DateTime CreatedDateTime { get; set; } = DateTime.UtcNow;
}