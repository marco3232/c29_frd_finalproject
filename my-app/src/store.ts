import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "./slices/todoSlices";


export const store = configureStore({
    reducer: {
        todo: todoReducer
    }
})

export type IRootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch