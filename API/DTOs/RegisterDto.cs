using System;
using System.ComponentModel.DataAnnotations;

namespace API.DTOs;

public class RegisterDto
{
    [Required]
    [MaxLength(20)]
    [MinLength(6)]
    public string Username { get; set; } = string.Empty;

    [Required]
    [MaxLength(20)]
    [MinLength(8)]
    public string Password { get; set; } = string.Empty;
}
