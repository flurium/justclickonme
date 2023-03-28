using System.ComponentModel.DataAnnotations;

namespace Api.Models;

internal record PasswordInput(

    [Required(ErrorMessage = "Email is required")]
    string Email,

    [Required(ErrorMessage = "Password is required")]
    string Password
);
internal record GoogleInput(

    [Required(ErrorMessage = "IdToken is required")]
    string IdToken
);