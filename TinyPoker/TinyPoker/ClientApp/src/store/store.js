import { configureStore } from "@reduxjs/toolkit";
import { chatSlice, roomSlice, uiSlice, userSlice } from "./";

export const store = configureStore({
    reducer: {
        chat: chatSlice.reducer,
        room: roomSlice.reducer,
        ui:   uiSlice.reducer,
        user: userSlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})