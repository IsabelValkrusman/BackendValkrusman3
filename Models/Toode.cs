namespace BackendValkrusman.Models
{
    public class Toode
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public double Price { get; set; }
        public bool Active { get; set; }
        public int Stock { get; set; }
        public Toode(int id, string name, double price, bool active, int stock)
        {
            Id = id;
            Name = name;
            Price = price;
            Active = active;
            Stock = stock;
        }
    }
}