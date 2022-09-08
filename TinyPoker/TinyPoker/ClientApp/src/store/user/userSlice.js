import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: JSON.parse(localStorage.getItem('user') || '{}')
    },
    reducers: {
        addUser: (state, { payload }) => {
            state.user = payload;
        },
    }
});


// Action creators are generated for each case reducer function
export const { addUser } = userSlice.actions;