using Amazon.DynamoDBv2.DataModel;

namespace TinyPoker.Data.Models
{
    [DynamoDBTable("rooms")]
    public class Room
    {
        [DynamoDBHashKey("roomId")]
        public string? RoomId { get; set; }
        [DynamoDBProperty("name")]
        public string? Name { get; set; }
        [DynamoDBProperty("owner")]
        public string? Owner { get; set; }
        [DynamoDBProperty("createDate")]
        public string? CreateDate { get; set; }
        [DynamoDBProperty("isActive")]
        public bool? IsActive { get; set; }
        [DynamoDBProperty("userStories")]
        public List<UserStory> UserStories { get; set; }
        public List<User> Users { get; set; }
    }
}
