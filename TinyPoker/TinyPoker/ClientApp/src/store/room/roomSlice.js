import { createSlice } from '@reduxjs/toolkit';

export const roomSlice = createSlice({
    name: 'room',   
    initialState: {
        counter: 10
    },
    reducers: {
        addRoom: (state, /* action */ ) => {
            state.counter += 1;
        },
    }
});


// Action creators are generated for each case reducer function
export const { addRoom } = roomSlice.actions;