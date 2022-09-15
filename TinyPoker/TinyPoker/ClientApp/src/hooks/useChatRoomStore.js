import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setConnection, onCloseConnection, addMessage } from '../store';
import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr';

export const useChatRoomStore = () => {
    const dispatch = useDispatch();

    const { connection, messages } = useSelector(state => state.chat );
    const [ users, setUsers] = useState([]);

    const joinRoom = async(user, userName, room) => {
        if (connection) return;

        try {
            const newConnection = new HubConnectionBuilder()
              .withUrl(`${process.env.REACT_APP_API_TINY_POKER_URL || window.location.origin + "/api"}/chat`)
              .configureLogging(LogLevel.Information)
              .build();
      
            newConnection.on("ReceiveMessage", (user, message) => {                
                dispatch(addMessage({user, ...message}))
            });
      
            newConnection.on("UsersInRoom", (users) => {
                const newUsers = [...new Map(users.map(item => [item['user'], item])).values()]
                setUsers(newUsers);
            });
      
            newConnection.onclose(e => {
                closeConnection();
                dispatch(onCloseConnection());
                setUsers([]);
            });
      
            if (!newConnection.connection._connectionStarted) await newConnection.start();
            await newConnection.invoke("JoinRoom", { user, userName, room });
            
            dispatch(setConnection(newConnection));

        } catch (e) {
            console.log(e);
        }
    }

    const sendMessage = async (messageType, message) => {
        try {
            await connection.invoke("SendMessage", { messageType, message });
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
        connection, 
        users,
        messages,
        joinRoom,
        sendMessage,
    }
}
