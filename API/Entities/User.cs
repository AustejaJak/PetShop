using System.ComponentModel.DataAnnotations;

namespace API.Entities
{
    public class User
    {
        [Key]
        public int VartotojoNr { get; set; }
        public string PrisijungimoVardas { get; set; } = null!;
        public string Pavarde { get; set; } = null!; 
        public string Slaptazodis { get; set; } = null!;
        public string TelefonoNr { get; set; } = null!;
        public string ElPastas { get; set; } = null!;
        public DateTime? GimimoData { get; set; }
        public string Adresas { get; set; } = null!;
        public string Role { get; set; } = null!;

    }
}