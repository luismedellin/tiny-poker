using Microsoft.AspNetCore.Mvc;
using TinyPoker.Core.DTOs;
using TinyPoker.Core.Services;

namespace TinyPoker.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserStoryController : ControllerBase
    {
        private readonly IRoomService roomService;

        public UserStoryController(IRoomService roomService)
        {
            this.roomService = roomService;
        }

        [HttpPost]
        public async Task<IActionResult> CreateUserStory([FromBody] UserStoryDto userStoryDto)
        {
            var userStory = await roomService.CreateUserStory(userStoryDto);

            return Created($"userstory/{userStory.UserStoryId}", userStory);
        }

        [HttpPost("{roomId}")]
        public async Task<IActionResult> VoteUserStory([FromBody] VoteDto voteDto)
        {
            await roomService.Vote(voteDto);

            return Ok($"{voteDto.User} voted to {voteDto.RoomId}");
        }

        [HttpGet("{roomId}/{userStoryId}")]
        public async Task<IActionResult> GetRoom(string roomId, string userStoryId)
        {
            var room = await roomService.GetUserStory(roomId, userStoryId);
            if (room == null) return NotFound();

            return Ok(room);
        }

        [HttpPut]
        public async Task<IActionResult> UpdateUserStory([FromBody] UserStoryDto userStory)
        {
            await roomService.UpdateUserStory(userStory);

            return Ok("User Story updated");
        }

        [HttpDelete("{roomId}/{userStoryId}")]
        public async Task<IActionResult> DeleteUserStory(string roomId, string userStoryId)
        {
            await roomService.DeleteUserStory(roomId, userStoryId);

            return Ok("User Story deleted");
        }
    }
}
