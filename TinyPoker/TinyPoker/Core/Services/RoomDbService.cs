using Amazon.DynamoDBv2.DataModel;
using TinyPoker.Core.DTOs;
using TinyPoker.Data.Models;

namespace TinyPoker.Core.Services
{
    public class RoomDbService : IRoomService
    {
        private readonly IDynamoDBContext _context;

        public RoomDbService(IDynamoDBContext dynamoDBContext)
        {
            _context = dynamoDBContext;
        }

        public Task AddUser(UserDto userDto)
        {
            throw new NotImplementedException();
        }

        public async Task<Room> CreateRoom(RoomDto roomDto)
        {
            var room = new Room()
            {
                RoomId = Guid.NewGuid().ToString(),
                Name = roomDto.Name,
                Owner = roomDto.Owner,
                IsActive = true,
                UserStories = new List<UserStory>(),
                CreateDate = DateTime.Now.ToString()
            };

            await _context.SaveAsync(room);

            return room;
        }

        public async Task<UserStory> CreateUserStory(UserStoryDto userStoryDto)
        {
            var room = await GetRoom(userStoryDto.RoomId);

            var userStory = new UserStory()
            {
                UserStoryId = Guid.NewGuid().ToString(),
                Title = userStoryDto.Title,
                IsActive = true,
                IsSelected = false
            };

            room.UserStories.Add(userStory);
            await _context.SaveAsync(room);

            return userStory;
        }

        public async Task DeleteUserStory(string roomId, string userStoryId)
        {
            var room = await GetRoom(roomId);

            var userStory = room.UserStories.First(u => u.UserStoryId == userStoryId);
            room.UserStories.Remove(userStory);

            await _context.SaveAsync(room);
        }

        public async Task<Room?> GetRoom(string roomId)
        {
            var room = await _context.LoadAsync<Room>(roomId);
            return room;
        }

        public Task<UserStory> GetUserStory(string roomId, string UserStoryId)
        {
            throw new NotImplementedException();
        }

        public Task RemoveUser(string roomId, string userId)
        {
            throw new NotImplementedException();
        }

        public Task UpdateRoom(RoomDto roomDto)
        {
            throw new NotImplementedException();
        }

        public Task UpdateUserStory(UserStoryDto userStoryDto)
        {
            throw new NotImplementedException();
        }

        public Task Vote(VoteDto voteDto)
        {
            throw new NotImplementedException();
        }
    }
}
