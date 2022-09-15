import { createSlice } from '@reduxjs/toolkit';

export const roomSlice = createSlice({
    name: 'room',   
    initialState: {
        counter: 10,
        room: {},
        currentUserStory: null
    },
    reducers: {
        addRoom: (state, { payload }) => {
            state.room = payload;
        },
        setCurrentUserStory: (state, { payload }) => {
            state.currentUserStory = payload;
        },
        setCounter: (state, /* action */ ) => {
            state.counter += 1;
        },
        onAddingUserStory: (state, { payload }) => {
            state.room.userStories.push(payload);
        },
        onDeleteUserStory: (state, { payload }) => {
            state.room.userStories = state.room.userStories.filter(us=> us.userStoryId !== payload);
        }
    }
});


// Action creators are generated for each case reducer function
export const { 
    addRoom,
    setCurrentUserStory,
    setCounter,

    onAddingUserStory,
    onDeleteUserStory
} = roomSlice.actions;