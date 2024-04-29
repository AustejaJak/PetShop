using System.ComponentModel.DataAnnotations;

namespace API.Entities
{
    public class Wish
    {
        [Key]
        public int NoroNr { get; set; }
        public string ProduktoPavadinimas { get; set; } = null!;
        public string Kategorija { get; set; } = null!; 
        public int Kiekis { get; set; }
        public string Tiekejas { get; set; } = null!;

    }
}