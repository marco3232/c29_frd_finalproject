import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { getUserInfo } from '../hook/userAPI';

// ---------------------------------------------------------------


interface AuthState {
    isAuthenticated: boolean;
    userData: {
        eng_given_name: string
    } | null
}

// ---------------------------------------------------------------

const initialState: AuthState = {
    isAuthenticated: !!localStorage.getItem('token'),
    userData: null
}

// ---------------------------------------------------------------

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginSuccess: (state, action: PayloadAction<any>) => {
            state.userData = action.payload;
            state.isAuthenticated = true;
        },
        logout: (state) => {
            state.userData = null;
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
            dispatch(loginSuccess(userData));
            localStorage.setItem('token', userData.token);
        } catch (error) {
            console.error('登入失敗:', error);

            throw error;
        }
    }
);

// ---------------------------------------------------------------

export const fetchUserInfo = () => async (dispatch: any) => {
    try {
        const token = localStorage.getItem('token');
        if (token) {
            const userInfo = await getUserInfo(token)
            dispatch(loginSuccess(userInfo))
        }
    } catch (error) {
        console.error('Error fetching user info:', error);
    }
}







//-------------------------------------------------------------------------------------------

export default authSlice.reducer;
export const { loginSuccess, logout } = authSlice.actions;
