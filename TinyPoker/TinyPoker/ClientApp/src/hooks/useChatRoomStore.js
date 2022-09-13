import { useState } from 'react';
import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr';

export const useChatRoomStore = () => {

    const [ connection, setConnection ] = useState(null);
    const [ users, setUsers] = useState([]);

    const joinRoom = async(user, userName, room) => {
        try {
            const connection = new HubConnectionBuilder()
              .withUrl(`${process.env.REACT_APP_API_TINY_POKER_URL || window.location.origin + "/api"}/chat`)
              .configureLogging(LogLevel.Information)
              .build();
      
            connection.on("ReceiveMessage", (user, message) => {
              // setMessages(messages => [...messages, { user, message }]);
              console.log(user, message)
            });
      
            connection.on("UsersInRoom", (users) => {
                const newUsers = [...new Map(users.map(item => [item['user'], item])).values()]
                setUsers(newUsers);
            });
      
            connection.onclose(e => {
              setConnection();
              // setMessages([]);
              setUsers([]);
            });
      
            if (!connection.connection._connectionStarted) await connection.start();
            await connection.invoke("JoinRoom", { user, userName, room });
            setConnection(connection);
        } catch (e) {
            console.log(e);
        }
    }

    const sendMessage = async (user, message) => {
        const chatMessage = {
            user: user.userId,
            message: message
        };

        try {
            await connection.invoke("SendMessage", message);
        } catch (e) {
            console.log(e);
        }
    }

    const closeConnection = async () => {
        try {
            await connection.stop();
        } catch (e) {
            console.log(e);
        }
    }

    return {
        users,
        joinRoom,
        sendMessage
    }
}
