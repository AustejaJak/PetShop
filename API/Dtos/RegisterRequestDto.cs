using System.ComponentModel.DataAnnotations;

namespace API.Dtos;

public class RegisterRequest
{
    [Required]
    public int VartotojoNr { get; set; }
    [Required]
    public string PrisijungimoVardas { get; set; } = null!;
    [Required]
    public string Pavarde { get; set; } = null!;
    [Required]
    public string Slaptazodis { get; set; } = null!;
    [Required]
    public string TelefonoNr { get; set; } = null!;
    [Required]
    public string ElPastas { get; set; } = null!;
    [Required]
    public DateTime? GimimoData { get; set; }
    [Required]
    public string Adresas { get; set; } = null!;
}