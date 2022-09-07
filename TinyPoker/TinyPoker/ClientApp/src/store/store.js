import { configureStore } from "@reduxjs/toolkit";
import { roomSlice } from "./";

export const store = configureStore({
    reducer: {
        room: roomSlice.reducer
    }
})