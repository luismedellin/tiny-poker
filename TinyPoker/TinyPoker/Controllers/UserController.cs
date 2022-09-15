using Microsoft.AspNetCore.Mvc;
using TinyPoker.Core.DTOs;
using TinyPoker.Core.Services;

namespace TinyPoker.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        private readonly IRoomService roomService;

        public UserController(IRoomService roomService)
        {
            this.roomService = roomService;
        }

        [HttpPost]
        public async Task<IActionResult> CreateRoom([FromBody] UserDto userDto)
        {
            await roomService.AddUser(userDto);

            return Ok($"User added to Room #{userDto.RoomId} ");
        }

        [HttpDelete("{roomId}/{userId}")]
        public async Task<IActionResult> DeleteUser(string roomId, string userId)
        {
            await roomService.RemoveUser(roomId, userId);

            return Ok("User removed");
        }
    }
}
