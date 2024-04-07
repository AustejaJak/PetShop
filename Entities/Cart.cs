using System.ComponentModel.DataAnnotations;

namespace API.Entities
{
    public class Cart
    {
        [Key]
        public int KrepselioNr { get; set; }
        public int SkelbimoNr { get; set; }
        public Poster PosterItem { get; set; } = null!;
        public int VartotojoNr { get; set; }
        public int SesijosNr { get; set; }
        public float ProduktuSuma { get; set; }
        public int Kiekis { get; set; }

    }
}