using System.ComponentModel.DataAnnotations;

namespace Api.Models;

public record EditLinkInput(

    [Required(ErrorMessage = "Slug is required")]
    string Slug,

    string? NewSlug,

    string? Destination,

    string? Title,

    string? Description
);

internal record LinkOutput(

    string Slug,

    string Destination,

    string Title,
    string Description,
    DateTime CreatedDateTime
);

public record CreateLinkInput(

    [Required(ErrorMessage = "Slug is required")]
    string Slug,

    [Required(ErrorMessage = "Destination is required to redirect somewhere")]
    string Destination,

    string Title,

    string Description
);

public record CreateLinkOutput(string Slug, string Destination, string Title, string Description, DateTime CreatedDateTime);