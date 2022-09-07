namespace TinyPoker.Core.DTOs
{
    public class VoteDto
    {
        public string RoomId { get; set; }
        public int UserHistoryId { get; set; }
        public string User { get; set; }
        public byte Points { get; set; }
    }
}
