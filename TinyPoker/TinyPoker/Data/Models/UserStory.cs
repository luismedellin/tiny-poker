using Amazon.DynamoDBv2.DataModel;

namespace TinyPoker.Data.Models
{

    public class UserStory
    {
        [DynamoDBProperty("userStoryId")]
        public string? UserStoryId { get; set; }
        [DynamoDBProperty("title")]
        public string? Title { get; set; }
        [DynamoDBProperty("isActive")]
        public bool? IsActive { get; set; }
        [DynamoDBProperty("isSelected")]
        public bool? IsSelected { get; set; }
        public List<Vote> Votes { get; set; }
    }

    public class Vote
    {
        public string UserId { get; set; }
        public byte Points { get; set; }
    }
}
