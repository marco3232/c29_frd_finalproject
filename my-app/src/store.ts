import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../src/slice/authSlice"
import { logisticSlice } from "./slice/logisticSlice";

// --------------------------------------------------------------------------------

export const store = configureStore({
    reducer: {
        auth: authReducer,
        logistic: logisticSlice.reducer
    }
})

// --------------------------------------------------------------------------------

export type IRootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch