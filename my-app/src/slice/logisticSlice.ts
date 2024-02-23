
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { getUserInfo } from '../hook/userAPI';

// ---------------------------------------------------------------

export interface TransactionType {
    room: string,
    building: string,
    street: string,
    district: string,
    contact_number: string,
    contact_name: string,
    confirmed_date: string,
    confirmed_session: string,

}

export interface DonationType {
    id: number;
    itemName: string;
    quantity: number;
}

export interface LogisticFormState {
    donationList: DonationType[]
    transaction: TransactionType

}

// ---------------------------------------------------------------

const initialState: LogisticFormState = {
    donationList: [],
    transaction: {
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

export const logisticSlice = createSlice({
    name: 'logistic',
    initialState,
    reducers: {
        updateDonationList: (state: LogisticFormState, action: PayloadAction<DonationType[]>) => {
            state.donationList = action.payload
        },
        updateTransaction: (state: LogisticFormState, action: PayloadAction<TransactionType>) => {
            state.transaction = action.payload
        },
        clearForm: (state: LogisticFormState) => {
            state = initialState
        },
    },
    // extraReducers: (builder) => {
    //     builder.addCase(submitLogistic.fulfilled, (state, action) => {

    //     })
    // }

});

// export const submitLogistic = createAsyncThunk(
//     'logistic/create',
//     async () => {
//         try {
//             console.log({
//                 initialState
//             })

//         } catch (error) {

//         }
//     }
// );


export default logisticSlice.reducer;
export const { updateDonationList, updateTransaction, clearForm } = logisticSlice.actions;