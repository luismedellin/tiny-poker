import { configureStore } from "@reduxjs/toolkit";
import { roomSlice, userSlice } from "./";

export const store = configureStore({
    reducer: {
        room: roomSlice.reducer,
        user: userSlice.reducer,
    }
})