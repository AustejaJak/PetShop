using System.ComponentModel.DataAnnotations;

namespace API.Dtos;

public class LoginRequest
{
    [Required]
    public string? PrisijungimoVardas { get; set; }
    [Required]
    public string? Slaptazodis { get; set; }
}