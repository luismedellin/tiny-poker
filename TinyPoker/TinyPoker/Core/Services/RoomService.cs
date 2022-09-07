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
                    UserHistories = new List<UserHistory>()
                    {
                        new UserHistory(){ IsActive = true, Title = "LATAM2-3891", UserHistoryId = 1, Votes = new List<Vote>()}
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
                RoomId = new Guid().ToString(),
                Name = roomDto.Name,
                Owner = roomDto.Owner,
                IsActive = true,
                UserHistories = new List<UserHistory>(),
                CreateDate = DateTime.Now,
                Users = new List<User>() { new User() { UserId = roomDto.Owner, Name = roomDto.Name } }
            };

            _rooms.Add(room);

            return await Task.FromResult(room);
        }

        public async Task<UserHistory> CreateUserHistory(UserHistoryDto userHistoryDto)
        {
            var room = await GetRoom(userHistoryDto.RoomId);

            var userHistory = new UserHistory()
            {
                UserHistoryId = room.UserHistories.Count + 1,
                Title = userHistoryDto.Title,
                IsActive = true
            };

            room.UserHistories.Add(userHistory);

            return await Task.FromResult(userHistory);
        }

        public async Task<Room?> GetRoom(string roomId)
        {
            var room = _rooms.FirstOrDefault(r => r.RoomId == roomId);

            if(room == null) return null;

            return await Task.FromResult(room);
        }

        public async Task<UserHistory> GetUserHistory(string roomId, int UserHistoryId)
        {
            var room = await GetRoom(roomId);
            var userHistory = room.UserHistories.FirstOrDefault(us => us.UserHistoryId ==UserHistoryId);

            return await Task.FromResult(userHistory);
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

        public async Task UpdateUserHistory(UserHistoryDto userHistoryDto)
        {
            var userHistory = await GetUserHistory(userHistoryDto.RoomId, userHistoryDto.UserHistoryId);

            if (userHistory == null) return;

            userHistory.Title = userHistoryDto.Title;
            userHistory.IsActive = userHistoryDto.IsActive.Value;
        }

        public async Task Vote(VoteDto voteDto)
        {
            var userHistory = await GetUserHistory(voteDto.RoomId, voteDto.UserHistoryId );

            if (userHistory == null) return;

            var savedVote = userHistory.Votes.FirstOrDefault(v => v.UserId == voteDto.User);
            var vote = new Vote()
            {
                UserId = voteDto.User,
                Points = voteDto.Points
            };

            if (savedVote != null)
            {
                userHistory.Votes.Remove(savedVote);
            }

            userHistory.Votes.Add(vote);
        }

        public async Task DeleteUserHistory(string roomId, int userHistoryId)
        {
            var room = await GetRoom(roomId);

            var userHistory = room.UserHistories.First(u => u.UserHistoryId == userHistoryId);
            room.UserHistories.Remove(userHistory);
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
