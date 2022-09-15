using Amazon.DynamoDBv2.DataModel;

namespace TinyPoker.Data.Models
{
    public class User
    {
        [DynamoDBProperty("owner")]
        public string UserId { get; set; }
        [DynamoDBProperty("owner")]
        public string Name { get; set; }
    }
}
