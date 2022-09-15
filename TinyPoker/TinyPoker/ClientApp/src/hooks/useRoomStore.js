import { useDispatch, useSelector } from 'react-redux';
import { 
    addRoom, 
    setCounter, 
    setCurrentUserHistory, 
    onAddingUserHistory, 
    onDeleteUserHistory 
} from '../store';
import { tinyPockerApi } from '../api';
import { useChatRoomStore } from './';

export const useRoomStore = () => {
    const dispatch = useDispatch();

    const { counter, room, currentUserHistory } = useSelector(state => state.room );
    const { sendMessage } = useChatRoomStore();
    const { user } = useSelector(state => state.user );

    const addCounter = async () => {
        const { data } = await tinyPockerApi.get(`/Rooms/abc1`);
        console.log(data);
        dispatch(setCounter());
    }

    const getRoom = async (roomId) => {
        if (room.id) return;

        const { data } = await tinyPockerApi.get(`/Rooms/${roomId}`);
        dispatch(addRoom(data));
    }

    const createRoom = async (room) => {
        const newRoom = {
            ...room,
            owner: user.userId
        };
        try{
            const { data } = await tinyPockerApi.post('/Rooms', newRoom);
            dispatch(addRoom(data));
            return data;
        } catch (e) {
            
        }
    }

    const createUserHistory = async(title) => {
        const userHistory = {
            roomId: room.roomId,
            title: title
        };

        try{
            const { data } = await tinyPockerApi.post('/userHistory', userHistory);
            addUserHistory(data);
            sendMessage("createUserHistory", JSON.stringify(data));
        } catch (e) {
            
        }
    }

    const deleteUserHistory = async(room, userHistoryId) => {
        try{
            await tinyPockerApi.delete(`/userHistory/${room}/${userHistoryId}`);
            dispatch(onDeleteUserHistory(userHistoryId));
            sendMessage("deleteUserHistory", JSON.stringify(userHistoryId));
        } catch (e) {
            
        }
    }

    const addUserHistory = (userHistory) => {
        dispatch(onAddingUserHistory(userHistory));
    }

    const setUserHistory = (userHistory) => {
        dispatch(setCurrentUserHistory(userHistory));
        const us = room.userHistories.find(us => us.userHistoryId === userHistory.userHistoryId);
    }

    const removeUserHistory = (userHistoryId) => {
        dispatch(onDeleteUserHistory(userHistoryId));
    }

    return {
        counter,
        room,
        currentUserHistory,

        addCounter,
        getRoom,
        createRoom,
        
        setUserHistory,
        createUserHistory,
        addUserHistory,
        deleteUserHistory,
        removeUserHistory
    }
}
