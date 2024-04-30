using System.ComponentModel.DataAnnotations;

namespace API.Entities
{
    public class CartItem
    {
        [Key]
        public string KrepselioSkelbimoNr { get; set; } = null!;
        public string KrepselioNr { get; set; } =  null!;
        public int Kiekis { get; set; }
        public DateTime SukurimoData { get; set; }
        public int SkelbimoNr { get; set; }
    }
}