import { PayloadAction, createSlice } from "@reduxjs/toolkit";

//-------------------------------------------------------------------------------------------

type TodoState = {
    todoItems: Array<{
        id: number, name: string, count: number
    }>
    newTaskCount: number;
    doneTaskCount: number;
    totalItemCreatedCount: number
}

//-------------------------------------------------------------------------------------------

const initialState: TodoState = {
    todoItems: [
        { id: 1, name: "buy Apple", count: 0 },
        { id: 2, name: "buy Orange", count: 0 },
        { id: 3, name: "buy Peach", count: 0 },
    ],
    newTaskCount: 3,
    doneTaskCount: 1,
    totalItemCreatedCount: 3,
}


export const todoSlice = createSlice({
    name: "todo",
    initialState,
    reducers: {
        add_item: (state: TodoState, action: PayloadAction<string>) => {
            let newId = state.totalItemCreatedCount + 1;
            state.totalItemCreatedCount = newId;
            state.newTaskCount += 1;
            // *immer*
            state.todoItems.push({
                id: newId, name: action.payload, count: 0,
            });
            // localStorage.setItem("storage", JSON.stringify(state));
        },

        //-------------------------------------------------------------------------------------------

        delete_item: (state: TodoState, action: PayloadAction<number>) => {
            let targetId = action.payload;
            state.todoItems = state.todoItems.filter((item) => {
                if (item.id === targetId) {
                    if (item.count === 0) {
                        state.newTaskCount--;
                    }
                }
                return item.id !== targetId;
            });
            localStorage.setItem("storage", JSON.stringify(state));
        },

        //-------------------------------------------------------------------------------------------

        complete_item: (state, action: PayloadAction<number>) => {
            const itemId = action.payload;
            state.todoItems = state.todoItems.map((item) => {
                if (item.id === itemId) {
                    item.count = 1;
                }
                return item;
            });
            // localStorage.setItem("storage", JSON.stringify(state));
            state.newTaskCount = state.todoItems.filter((item) => item.count === 0).length;
            state.doneTaskCount = state.todoItems.filter((item) => item.count === 1).length;
        },

        //-------------------------------------------------------------------------------------------

        edit_item: (state, action: PayloadAction<{ newName: string; id: number }>) => {
            // console.log("edit_item", action);
            state.todoItems = state.todoItems?.map((entry) => {
                if (entry.id === action.payload.id) {
                    entry.name = action.payload.newName;
                }
                return entry;
            });
            // localStorage.setItem("storage", JSON.stringify(state));
        },
    },
});


//-------------------------------------------------------------------------------------------
export const { add_item, delete_item, complete_item, edit_item } = todoSlice.actions;
export default todoSlice.reducer;