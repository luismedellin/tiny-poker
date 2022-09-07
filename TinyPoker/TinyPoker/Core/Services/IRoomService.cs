using TinyPoker.Core.DTOs;
using TinyPoker.Data.Models;

namespace TinyPoker.Core.Services
{
    public interface IRoomService
    {
        Task<Room> CreateRoom(RoomDto roomDto);
        Task<UserHistory> CreateUserHistory(UserHistoryDto userHistory);
        Task<Room?> GetRoom(string roomId);
        Task<UserHistory> GetUserHistory(string roomId, int UserHistoryId);
        Task UpdateRoom(RoomDto roomDto);
        Task AddUser(UserDto userDto);
        Task UpdateUserHistory(UserHistoryDto userHistoryDto);
        Task Vote(VoteDto voteDto);
        Task DeleteUserHistory(string roomId, int userHistoryId);
        Task RemoveUser(string roomId, string userId);
    }
}
