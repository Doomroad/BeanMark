using System;
using System.Security.Cryptography;
using System.Text;
using System.Text.Json;
using API.Entities;
using Microsoft.EntityFrameworkCore;

namespace API.Data;

public class Seed
{
    /* public static async Task SeedUsers(DataContext context)
    {
        if (await context.Users.AnyAsync()) return;

        var userData = await File.ReadAllTextAsync("Data/UserSeedData.json");

        var options = new JsonSerializerOptions { PropertyNameCaseInsensitive = true };

        var users = JsonSerializer.Deserialize<List<AppUser>>(userData, options);

        if (users == null) return;

        foreach (var user in users)
        {
            using var hmac = new HMACSHA512();

            user.UserName = user.UserName.ToLower();
            user.PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes("Pa$$w0rd"));
            user.PasswordSalt = hmac.Key;

            context.Users.Add(user);
        }

        await context.SaveChangesAsync();
    } */

    public static async Task SeedUsers(DataContext context)
    {
        if (await context.Users.AnyAsync()) return;

        var userData = await File.ReadAllTextAsync("Data/UserSeedData.json");
        var options = new JsonSerializerOptions { PropertyNameCaseInsensitive = true };

        var userDtos = JsonSerializer.Deserialize<List<SeedUserDto>>(userData, options);
        if (userDtos == null) return;

        foreach (var userDto in userDtos)
        {
            using var hmac = new HMACSHA512();

            var user = new AppUser
            {
                UserName = userDto.UserName.ToLower(),
                Email = userDto.Email.ToLower(),
                PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes("Pa$$w0rd")),
                PasswordSalt = hmac.Key,
                /* Gender = userDto.Gender,
                KnownAs = userDto.KnownAs,
                DateOfBirth = userDto.DateOfBirth, */
                Created = userDto.Created,
                LastActive = userDto.LastActive,
                /* Introduction = userDto.Introduction,
                LookingFor = userDto.LookingFor,
                Interests = userDto.Interests,
                City = userDto.City,
                Country = userDto.Country, */
                Photos = userDto.Photos.Select(p => new Photo
                {
                    Url = p.Url,
                    IsMain = p.IsMain
                }).ToList()
            };

            context.Users.Add(user);
        }

        await context.SaveChangesAsync();
    }

}
