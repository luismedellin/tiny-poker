namespace TinyPoker.Data.Models
{
    public class UserHistory
    {
        public int UserHistoryId { get; set; }
        public string Title { get; set; }
        public bool IsActive { get; set; }
        public bool IsSelected { get; set; }
        public List<Vote> Votes { get; set; }
    }

    public class Vote
    {
        public string UserId { get; set; }
        public byte Points { get; set; }
    }
}
