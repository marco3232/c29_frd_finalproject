import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { IRootState } from '../store';

// ---------------------------------------------------------------

interface AuthState {
    isAuthenticated: boolean;
    eng_given_name: string | null;
}

// ---------------------------------------------------------------

const initialState: AuthState = {
    isAuthenticated: !!localStorage.getItem('token'),
    eng_given_name: null
}

// ---------------------------------------------------------------

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginSuccess: (state, action: PayloadAction<string>) => {
            state.eng_given_name = action.payload;
            state.isAuthenticated = true;
        },
        logout: (state) => {
            state.eng_given_name = null;
            localStorage.removeItem('token');
            state.isAuthenticated = false;
        }
    }
});

// ---------------------------------------------------------------

export const login = createAsyncThunk(
    'auth/login',
    async (payload: { eng_given_name: string, password: string }, { dispatch }) => {
        try {

            const response = await fetch('/auth/login', {
                method: 'POST',
                body: JSON.stringify(payload),
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {

                throw new Error('登入失敗');
            }

            const userData = await response.json();


            dispatch(loginSuccess(userData.username));
            localStorage.setItem('token', userData.token);
        } catch (error) {
            console.error('登入失敗:', error);

            throw error;
        }
    }
);

export default authSlice.reducer;
export const { loginSuccess, logout } = authSlice.actions;
