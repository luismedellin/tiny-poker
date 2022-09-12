using Microsoft.AspNetCore.SignalR;

namespace TinyPoker.Hubs
{
    public class ChatHub : Hub
    {
        private readonly string _botUser;
        private readonly IDictionary<string, UserConnection> _connections;

        public ChatHub(IDictionary<string, UserConnection> connections)
        {
            _botUser = "MyChat Bot";
            _connections = connections;
        }

        public override Task OnDisconnectedAsync(Exception exception)
        {
            if (_connections.TryGetValue(Context.ConnectionId, out UserConnection userConnection))
            {
                _connections.Remove(Context.ConnectionId);
                Clients.Group(userConnection.Room).SendAsync("ReceiveMessage", $"{userConnection.User} has left");
                SendUsersConnected(userConnection.Room);
            }

            return base.OnDisconnectedAsync(exception);
        }

        public async Task JoinRoom(UserConnection userConnection)
        {
            if (!_connections.ContainsKey(Context.ConnectionId))
            {
                await Groups.AddToGroupAsync(Context.ConnectionId, userConnection.Room);
                _connections[Context.ConnectionId] = userConnection;
            }

            //await Clients.Group(userConnection.Room).SendAsync("ReceiveMessage", $"{userConnection.User} has joined {userConnection.Room}");
            await Clients.Group(userConnection.Room).SendAsync("ReceiveMessage", new
            {
                userConnection.User,
                userConnection.UserName
            });

            await SendUsersConnected(userConnection.Room);
        }

        public async Task SendMessage(string message)
        {
            if (_connections.TryGetValue(Context.ConnectionId, out UserConnection userConnection))
            {
                await Clients.Group(userConnection.Room).SendAsync("ReceiveMessage", userConnection.User, message);
            }
        }

        public Task SendUsersConnected(string room)
        {
            var users = _connections.Values
                .Where(c => c.Room == room)
                .Select(c => new
                {
                    c.User,
                    c.UserName
                });

            return Clients.Group(room).SendAsync("UsersInRoom", users);
        }
    }
}
