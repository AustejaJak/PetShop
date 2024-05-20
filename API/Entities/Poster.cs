using System.ComponentModel.DataAnnotations;

namespace API.Entities
{
    public class Poster
    {
        [Key]
        public int SkelbimoNr { get; set; }
        [Required]
        public string GyvunuKategorija { get; set; } = null!;
        [Required]
        public string Pavadinimas { get; set; } = null!;
        [Required]
        public int Kiekis { get; set; }
        [Required]
        public decimal Kaina { get; set; }
        [Required]
        public string Aprasas { get; set; } = null!; 
        [Required]
        public string Nuotrauka { get; set; } = null!; 
        [Required]
        public int Ivertinimas { get; set; }
        [Required]
        public string SkelbimoValidacija { get; set; } = null!;

    }
}