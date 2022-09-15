using TinyPoker.Core.DTOs;
using TinyPoker.Data.Models;

namespace TinyPoker.Core.Services
{
    public interface IRoomService
    {
        Task<Room> CreateRoom(RoomDto roomDto);
        Task<UserStory> CreateUserStory(UserStoryDto userStory);
        Task<Room?> GetRoom(string roomId);
        Task<UserStory> GetUserStory(string roomId, string UserStoryId);
        Task UpdateRoom(RoomDto roomDto);
        Task AddUser(UserDto userDto);
        Task UpdateUserStory(UserStoryDto userStoryDto);
        Task Vote(VoteDto voteDto);
        Task DeleteUserStory(string roomId, string userStoryId);
        Task RemoveUser(string roomId, string userId);
    }
}
