using Microsoft.AspNetCore.Mvc;
using TinyPoker.Core.DTOs;
using TinyPoker.Core.Services;

namespace TinyPoker.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserHistoryController : ControllerBase
    {
        private readonly IRoomService roomService;

        public UserHistoryController(IRoomService roomService)
        {
            this.roomService = roomService;
        }

        [HttpPost]
        public async Task<IActionResult> CreateUserHistory([FromBody] UserHistoryDto userHistoryDto)
        {
            var userHistory = await roomService.CreateUserHistory(userHistoryDto);

            return Created($"userhistory/{userHistory.UserHistoryId}", userHistory);
        }

        [HttpPost("{roomId}")]
        public async Task<IActionResult> VoteUserHistory([FromBody] VoteDto voteDto)
        {
            await roomService.Vote(voteDto);

            return Ok($"{voteDto.User} voted to {voteDto.RoomId}");
        }

        [HttpGet("{roomId}/{userHistoryId}")]
        public async Task<IActionResult> GetRoom(string roomId, int userHistoryId)
        {
            var room = await roomService.GetUserHistory(roomId, userHistoryId);
            if (room == null) return NotFound();

            return Ok(room);
        }

        [HttpPut]
        public async Task<IActionResult> UpdateUserHistory([FromBody] UserHistoryDto userHistory)
        {
            await roomService.UpdateUserHistory(userHistory);

            return Ok("User History updated");
        }

        [HttpDelete("{roomId}/{userHistoryId}")]
        public async Task<IActionResult> DeleteUserHistory(string roomId, int userHistoryId)
        {
            await roomService.DeleteUserHistory(roomId, userHistoryId);

            return Ok("User History deleted");
        }
    }
}
