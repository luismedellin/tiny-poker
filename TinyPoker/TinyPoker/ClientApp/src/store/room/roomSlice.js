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
        },
        setCurrentUserHistory: (state, { payload }) => {
            state.currentUserHistory = payload;
        },
        setCounter: (state, /* action */ ) => {
            state.counter += 1;
        },
        onAddingUserHistory: (state, { payload }) => {
            state.room.userHistories.push(payload);
        },
        onDeleteUserHistory: (state, { payload }) => {
            state.room.userHistories = state.room.userHistories.filter(us=> us.userHistoryId !== payload);
        }
    }
});


// Action creators are generated for each case reducer function
export const { 
    addRoom,
    setCurrentUserHistory,
    setCounter,

    onAddingUserHistory,
    onDeleteUserHistory
} = roomSlice.actions;