import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: 0,
};

export const sessionSlice = createSlice({
    name: "session",
    initialState,
    reducers: {},
});

// Action creators are generated for each case reducer function
export const {} = sessionSlice.actions;

export default sessionSlice.reducer;
