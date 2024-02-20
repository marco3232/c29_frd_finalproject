import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { getUserInfo } from "../hook/userAPI";

// ---------------------------------------------------------------

export interface TransactionType {
  room: string;
  building: string;
}

export interface DonationType {
  id: number;
  itemName: string;
  quantity: number;
}

export interface LogisticFormState {
  donationList: DonationType[];
  transaction: TransactionType;
}

// ---------------------------------------------------------------

const initialState: LogisticFormState = {
  donationList: [],
  transaction: {
    room: "",
    building: "",
  },
};

// ---------------------------------------------------------------

export const logisticSlice = createSlice({
  name: "logistic",
  initialState,
  reducers: {
    updateDonationList: (
      state: LogisticFormState,
      action: PayloadAction<DonationType[]>
    ) => {
      state.donationList = action.payload;
    },
    updateTransaction: (
      state: LogisticFormState,
      action: PayloadAction<TransactionType>
    ) => {
      state.transaction = action.payload;
    },
    clearForm: (state: LogisticFormState) => {
      state = initialState;
    },
  },
});

export default logisticSlice.reducer;
export const { updateDonationList, updateTransaction, clearForm } =
  logisticSlice.actions;
