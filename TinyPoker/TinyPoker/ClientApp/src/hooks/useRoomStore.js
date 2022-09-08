import { useDispatch, useSelector } from 'react-redux';
import { addRoom, setCounter } from '../store';
import { tinyPockerApi } from '../api';

export const useRoomStore = () => {
    const dispatch = useDispatch();

    const { counter, room, currentUserHistory } = useSelector(state => state.room );
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

    return {
        counter,
        room,
        currentUserHistory,

        addCounter,
        getRoom,
        createRoom
    }
}
