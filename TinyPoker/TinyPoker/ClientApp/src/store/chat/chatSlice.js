import { createSlice } from '@reduxjs/toolkit';

export const chatSlice = createSlice({
    name: 'connection',
    initialState: {
        connection: null,
        messages: []
    },
    reducers: {
        setConnection: (state, { payload }) => {
            state.connection = payload;
        },
        onCloseConnection: (state) => {
            state.connection = null;
            state.messages = [];
        },
        addMessage: (state, { payload }) => {
            state.messages.unshift(payload);
        }
    }
});

// Action creators are generated for each case reducer function
export const { setConnection, onCloseConnection, addMessage } = chatSlice.actions;