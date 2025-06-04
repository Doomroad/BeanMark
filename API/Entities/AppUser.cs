using API.Extensions;

namespace API.Entities;

public class AppUser
{
    public int Id { get; set; }
    public required string UserName { get; set; }
    public required string Email { get; set; }
    public required byte[] PasswordHash { get; set; } = [];
    public required byte[] PasswordSalt { get; set; } = [];
    public DateTime Created { get; set; } = DateTime.UtcNow;
    public DateTime LastActive { get; set; } = DateTime.UtcNow;
    public List<Photo> Photos { get; set; } = [];
    public List<UserLike> LikedByUsers { get; set; } = [];
    public List<UserLike> LikedUsers { get; set; } = [];


    /* public DateOnly DateOfBirth { get; set; }
    public required string KnownAs { get; set; } */
    /* public string? Interests { get; set; }
    public string? LookingFor { get; set; }
    public string? Country { get; set; }
    public string? City { get; set; } */
    /* public string? Introduction { get; internal set; }
    public string? Gender { get; internal set; } */
    /* public int GetAge()
    {
        return DateOfBirth.CalculateAge();
    } */
}
