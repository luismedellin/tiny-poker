namespace TinyPoker.Data.Models
{
    public class Room
    {
        public string? RoomId { get; set; }
        public string? Name { get; set; }
        public string? Owner { get; set; }
        public DateTime? CreateDate { get; set; }
        public bool? IsActive { get; set; }
        public List<UserStory> UserStories { get; set; }
        public List<User> Users { get; set; }
    }
}
