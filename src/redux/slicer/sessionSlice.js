import { createSlice } from "@reduxjs/toolkit";
import { getTotal, getTotalEarn, toMillion } from "../../Functions";

const initialState = {
    sessions: [],
};

export const sessionSlice = createSlice({
    name: "session",
    initialState,
    reducers: {
        initData: (state, action) => {
            state.sessions = action.payload;
        },
        createEstate: (state, action) => {
            state.sessions.forEach((session) => {
                if (session.id === action.payload.sessionId) {
                    session.estates.push(action.payload.estate);
                    session.totalEstateBought = session.estates.length;
                    session.totalBought = getTotal(session.estates, "bought");
                    session.totalEarn = getTotalEarn(session.estates);
                    session.newBudget = session.budget + session.totalEarn;
                }
            });
            localStorage.setItem("sessions", JSON.stringify(state.sessions));
        },
        deleteEstate: (state, action) => {
            state.sessions.forEach((session) => {
                if (session.id === action.payload.sessionId) {
                    session.estates = session.estates.filter(
                        (estate) => estate.id !== action.payload.estateId
                    );
                    session.totalEstateBought = session.estates.length;
                    session.totalBought = getTotal(session.estates, "bought");
                    session.totalEarn = getTotalEarn(session.estates);
                    session.newBudget = session.budget + session.totalEarn;
                }
            });
            localStorage.setItem("sessions", JSON.stringify(state.sessions));
        },
        updateEstate: (state, action) => {
            state.sessions.forEach((session) => {
                if (session.id === action.payload.sessionId) {
                    session.estates.forEach((estate) => {
                        if (estate.id === action.payload.updatedEstate.id) {
                            estate.bought = toMillion(
                                action.payload.updatedEstate.bought
                            );
                            estate.estimated = toMillion(
                                action.payload.updatedEstate.estimated
                            );
                            estate.sale = toMillion(
                                action.payload.updatedEstate.sale
                            );
                            estate.buyAt = action.payload.updatedEstate.buyAt;
                            estate.sellAt = action.payload.updatedEstate.sellAt;
                        }
                    });
                    session.totalBought = getTotal(session.estates, "bought");
                    session.totalEarn = getTotalEarn(session.estates);
                    session.newBudget = session.budget + session.totalEarn;
                }
            });
            localStorage.setItem("sessions", JSON.stringify(state.sessions));
        },
        createSession: (state, action) => {
            state.sessions = [action.payload, ...state.sessions];
            localStorage.setItem("sessions", JSON.stringify(state.sessions));
        },
        updateSession: (state, action) => {
            state.sessions.forEach((session) => {
                if (session.id === action.payload.sessionId) {
                    session.start = action.payload.start;
                    session.end = action.payload.end;
                    session.budget = action.payload.budget;
                    session.newBudget =
                        action.payload.budget + session.totalEarn;
                }
            });
            localStorage.setItem("sessions", JSON.stringify(state.sessions));
        },
        deleteSession: (state, action) => {
            const newSessions = state.sessions.filter(
                (session) => session.id !== action.payload
            );
            state.sessions = newSessions;
            localStorage.setItem("sessions", JSON.stringify(state.sessions));
        },
    },
});

// Action creators are generated for each case reducer function
export const {
    createSession,
    createEstate,
    deleteEstate,
    initData,
    deleteSession,
    updateEstate,
    updateSession,
} = sessionSlice.actions;

export default sessionSlice.reducer;
