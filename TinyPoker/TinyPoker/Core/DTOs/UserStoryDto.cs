namespace TinyPoker.Core.DTOs
{
    public class UserStoryDto
    {
        public string? RoomId { get; set; }
        public string? UserStoryId { get; set; }
        public string Title { get; set; }
        public bool? IsActive { get; set; }
    }
}
