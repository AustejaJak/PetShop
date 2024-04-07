using System.ComponentModel.DataAnnotations;

namespace API.Entities
{
    public class Product
    {
        [Key]
        public int ProduktoNr { get; set; }
        public string Pavadinimas { get; set; } = null!;
        public string Kategorija { get; set; } = null!; 
        public int Kiekis { get; set; }
        public string Tiekejas { get; set; } = null!;

    }
}