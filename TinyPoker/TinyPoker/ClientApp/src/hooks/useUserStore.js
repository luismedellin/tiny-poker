import { useDispatch, useSelector } from 'react-redux';
import { addUser } from '../store';

export const useUserStore = () => {
    const dispatch = useDispatch();

    const { user } = useSelector(state => state.user );

    const setUser = (user) => {
        localStorage.setItem('user', JSON.stringify(user));
        dispatch(addUser(user))
    }

    return {
        user,

        setUser
    }
}
