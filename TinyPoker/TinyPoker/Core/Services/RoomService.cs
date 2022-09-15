using TinyPoker.Core.DTOs;
using TinyPoker.Data.Models;

namespace TinyPoker.Core.Services
{
    public class RoomService : IRoomService
    {
        private readonly List<Room> _rooms;

        public RoomService()
        {
            _rooms = new List<Room>()
            {
                new Room()
                {
                    RoomId = "abc1",
                    Name = "Latam2",
                    CreateDate = DateTime.Now,
                    IsActive = true,
                    Owner = "lvelandia",
                    UserStories = new List<UserStory>()
                    {
                        new UserStory(){ IsActive = true, Title = "LATAM2-3891", UserStoryId = 1, Votes = new List<Vote>()},
                        new UserStory(){ IsActive = false, Title = "LATAM2-3892", UserStoryId = 2, Votes = new List<Vote>()},
                    },
                    Users = new List<User>()
                    {
                        new User() { UserId = "lvelandia", Name = "Luis" }
                    },
                }
            };
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
                CreateDate = DateTime.Now,
                Users = new List<User>() { new User() { UserId = roomDto.Owner, Name = roomDto.Name } }
            };

            _rooms.Add(room);

            return await Task.FromResult(room);
        }

        public async Task<UserStory> CreateUserStory(UserStoryDto userStoryDto)
        {
            var room = await GetRoom(userStoryDto.RoomId);

            var userStory = new UserStory()
            {
                UserStoryId = room.UserStories.Count + 1,
                Title = userStoryDto.Title,
                IsActive = true
            };

            room.UserStories.Add(userStory);

            return await Task.FromResult(userStory);
        }

        public async Task<Room?> GetRoom(string roomId)
        {
            var room = _rooms.FirstOrDefault(r => r.RoomId == roomId);

            if(room == null) return null;

            return await Task.FromResult(room);
        }

        public async Task<UserStory> GetUserStory(string roomId, int UserStoryId)
        {
            var room = await GetRoom(roomId);
            var userStory = room.UserStories.FirstOrDefault(us => us.UserStoryId ==UserStoryId);

            return await Task.FromResult(userStory);
        }

        public async Task UpdateRoom(RoomDto roomDto)
        {
            var room = await GetRoom(roomDto.RoomId);

            if (room == null) return;

            room.Name = roomDto.Name;
            room.IsActive = roomDto.IsActive;
        }

        public async Task AddUser(UserDto userDto)
        {
            var room = await GetRoom(userDto.RoomId);

            if (room == null) return;

            room.Users.Add(new User { UserId = userDto.UserId, Name = userDto.Name });
        }

        public async Task UpdateUserStory(UserStoryDto userStoryDto)
        {
            var userStory = await GetUserStory(userStoryDto.RoomId, userStoryDto.UserStoryId.Value);

            if (userStory == null) return;

            userStory.Title = userStoryDto.Title;
            userStory.IsActive = userStoryDto.IsActive.Value;
        }

        public async Task Vote(VoteDto voteDto)
        {
            var userStory = await GetUserStory(voteDto.RoomId, voteDto.UserStoryId );

            if (userStory == null) return;

            var savedVote = userStory.Votes.FirstOrDefault(v => v.UserId == voteDto.User);
            var vote = new Vote()
            {
                UserId = voteDto.User,
                Points = voteDto.Points
            };

            if (savedVote != null)
            {
                userStory.Votes.Remove(savedVote);
            }

            userStory.Votes.Add(vote);
        }

        public async Task DeleteUserStory(string roomId, int userStoryId)
        {
            var room = await GetRoom(roomId);

            var userStory = room.UserStories.First(u => u.UserStoryId == userStoryId);
            room.UserStories.Remove(userStory);
        }

        public async Task RemoveUser(string roomId, string userId)
        {
            var room = await GetRoom(roomId);

            if (room == null) return;

            var user = room.Users.FirstOrDefault(u => u.UserId == userId);

            room.Users.Remove(user);
        }
    }
}
