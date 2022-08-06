import { configureStore } from "@reduxjs/toolkit";
import sessionSlice from "./slicer/sessionSlice";

export const store = configureStore({
    reducer: {
        sessions: sessionSlice,
    },
});
