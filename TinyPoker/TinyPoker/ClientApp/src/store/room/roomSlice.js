import { createSlice } from '@reduxjs/toolkit';

export const roomSlice = createSlice({
    name: 'room',   
    initialState: {
        counter: 10,
        room: {},
        currentUserHistory: null
    },
    reducers: {
        addRoom: (state, { payload }) => {
            state.room = payload;
            console.log(payload);
        },
        setCounter: (state, /* action */ ) => {
            state.counter += 1;
        },
    }
});


// Action creators are generated for each case reducer function
export const { addRoom, setCounter } = roomSlice.actions;