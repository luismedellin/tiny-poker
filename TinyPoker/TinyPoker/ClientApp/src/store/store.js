import { configureStore } from "@reduxjs/toolkit";
import { roomSlice, uiSlice, userSlice } from "./";

export const store = configureStore({
    reducer: {
        room: roomSlice.reducer,
        ui:   uiSlice.reducer,
        user: userSlice.reducer,
    }
})