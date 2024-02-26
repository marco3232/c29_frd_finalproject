
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

// ----------------------------------------------------------------

export interface CheckOutTransactionType {
    room: string;
    building: string;
    street: string;
    district: string;
    contact_number: string;
    contact_name: string;
    confirmed_date: string;
    confirmed_session: string;
  }

  export interface RentalType {
    id:number;
    itemName:string;
    quantity:number;
    deposite_charge:number;
    rent_charge:number;
  }

  export interface CheckOutState {
    rentalList : RentalType[]
    checkoutTransaction: CheckOutTransactionType

  }

// ---------------------------------------------------------------

const initialState: CheckOutState = {
    rentalList: [],
    checkoutTransaction: {
        room: '',
        building: '',
        street: '',
        district: '',
        contact_number: '',
        contact_name: '',
        confirmed_date: '',
        confirmed_session: ''
    }
}

// ---------------------------------------------------------------

export const checkOutSlice = createSlice({
    name: "checkout",
    initialState,
    reducers:{
        updateRentalList: (state: CheckOutState, action : PayloadAction<RentalType[]>) => {
            state.rentalList = action.payload
        },
        updateCheckOutTransaction: (state: CheckOutState, action : PayloadAction<RentalType[]>) => {
            state.rentalList = action.payload
        },
        clearForm: (state: CheckOutState) => {
            state = initialState
        },
    },

});

export default checkOutSlice.reducer;
export const {updateRentalList, updateCheckOutTransaction, clearForm} = checkOutSlice.actions;