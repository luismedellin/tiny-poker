﻿using Microsoft.AspNetCore.Mvc;
using System.Net;
using TinyPoker.Core.DTOs;
using TinyPoker.Core.Services;

namespace TinyPoker.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class RoomsController : ControllerBase
    {
        private readonly IRoomService roomService;

        public RoomsController(IRoomService roomService)
        {
            this.roomService = roomService;
        }

        [HttpGet("{roomId}")]
        public async Task<IActionResult> GetRoom(string roomId)
        {
            try
            {
                var room = await roomService.GetRoom(roomId);
                if (room == null) return NotFound();

                return Ok(room);
            }
            catch (Exception ex)
            {
                return StatusCode((int)HttpStatusCode.InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        public async Task<IActionResult> CreateRoom([FromBody] RoomDto roomDto)
        {
            var newRoom = await roomService.CreateRoom(roomDto);

            return Created($"rooms/{newRoom.RoomId}", newRoom);
        }

        [HttpPut]
        public async Task<IActionResult> UpdateRoom([FromBody] RoomDto roomDto)
        {
            await roomService.UpdateRoom(roomDto);

            return Ok("Room updated");
        }
    }
}
