using System;

namespace API.Data;

public class SeedUserDto
{
    public string UserName { get; set; } = string.Empty;
    public string Gender { get; set; } = string.Empty;
    public DateOnly DateOfBirth { get; set; }
    public string KnownAs { get; set; } = string.Empty;
    public DateTime Created { get; set; }
    public DateTime LastActive { get; set; }
    public string? Introduction { get; set; }
    public string? LookingFor { get; set; }
    public string? Interests { get; set; }
    public string City { get; set; } = string.Empty;
    public string Country { get; set; } = string.Empty;
    public List<SeedPhotoDto> Photos { get; set; } = [];
}

public class SeedPhotoDto
{
    public string Url { get; set; } = string.Empty;
    public bool IsMain { get; set; }
}