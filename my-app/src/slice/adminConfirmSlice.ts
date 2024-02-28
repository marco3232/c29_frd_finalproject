import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AdminConfirmState {
    submittedStatus: string[];
}

const initialState: AdminConfirmState = {
    submittedStatus: [],
};

export const adminConfirmSlice = createSlice({
    name: 'adminConfirm',
    initialState,
    reducers: {
        setSubmittedStatus: (state, action: PayloadAction<{ index: number; status: string }>) => {
            const { index, status } = action.payload;
            state.submittedStatus[index] = status;
        },
    },
});

export const { setSubmittedStatus } = adminConfirmSlice.actions;
export default adminConfirmSlice.reducer;