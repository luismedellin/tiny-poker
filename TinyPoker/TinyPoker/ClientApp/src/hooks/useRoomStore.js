import { useDispatch, useSelector } from 'react-redux';
import { addRoom } from '../store';
import { tinyPockerApi } from '../api';

export const useRoomStore = () => {
    const dispatch = useDispatch();

    const { counter } = useSelector(state => state.room );

    const addCounter = async () => {
        const { data } = await tinyPockerApi.get(`/Rooms/abc1`);
        console.log(data);
        dispatch(addRoom());
    }

    return {
        counter,

        addCounter
    }
}
