namespace TinyPoker.Core.DTOs
{
    public class UserHistoryDto
    {
        public string? RoomId { get; set; }
        public int UserHistoryId { get; set; }
        public string Title { get; set; }
        public bool? IsActive { get; set; }
    }
}
