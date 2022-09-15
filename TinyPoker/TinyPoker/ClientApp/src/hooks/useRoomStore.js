import { useDispatch, useSelector } from 'react-redux';
import { 
    addRoom, 
    setCounter, 
    setCurrentUserStory, 
    onAddingUserStory, 
    onDeleteUserStory 
} from '../store';
import { tinyPockerApi } from '../api';
import { useChatRoomStore } from './';

export const useRoomStore = () => {
    const dispatch = useDispatch();

    const { counter, room, currentUserStory } = useSelector(state => state.room );
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

    const createUserStory = async(title) => {
        const userStory = {
            roomId: room.roomId,
            title: title
        };

        try{
            const { data } = await tinyPockerApi.post('/userStory', userStory);
            addUserStory(data);
            sendMessage("createUserStory", JSON.stringify(data));
        } catch (e) {
            
        }
    }

    const deleteUserStory = async(room, userStoryId) => {
        try{
            await tinyPockerApi.delete(`/userStory/${room}/${userStoryId}`);
            dispatch(onDeleteUserStory(userStoryId));
            sendMessage("deleteUserStory", JSON.stringify(userStoryId));
        } catch (e) {
            
        }
    }

    const addUserStory = (userStory) => {
        dispatch(onAddingUserStory(userStory));
    }

    const setUserStory = (userStory) => {
        dispatch(setCurrentUserStory(userStory));
        const us = room.userStories.find(us => us.userStoryId === userStory.userStoryId);
    }

    const removeUserStory = (userStoryId) => {
        dispatch(onDeleteUserStory(userStoryId));
    }

    return {
        counter,
        room,
        currentUserStory,

        addCounter,
        getRoom,
        createRoom,
        
        setUserStory,
        createUserStory,
        addUserStory,
        deleteUserStory,
        removeUserStory
    }
}
