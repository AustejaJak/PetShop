using System.ComponentModel.DataAnnotations;

namespace API.Entities
{
    public class Poster
    {
        [Key]
        public int SkelbimoNr { get; set; }
        public string GyvunuKategorija { get; set; } = null!;
        public string Pavadinimas { get; set; } = null!;
        public float Kaina { get; set; }
        public string Aprasas { get; set; } = null!; 
        public string Nuotrauka { get; set; } = null!; 
        public int Ivertinimas { get; set; }
        public string SkelbimoValidacija { get; set; } = null!;

    }
}