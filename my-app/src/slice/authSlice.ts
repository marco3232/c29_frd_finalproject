
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { getUserInfo } from '../hook/userAPI';

// ---------------------------------------------------------------


interface AuthState {
    isAuthenticated: boolean;
    role: string
    userData: {
        eng_given_name: string
    }
}

// ---------------------------------------------------------------

const initialState: AuthState = {
    isAuthenticated: !!localStorage.getItem('token'),
    role: 'admin',
    userData: {
        eng_given_name: ''
    }
}

// ---------------------------------------------------------------

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginSuccess: (state, action: PayloadAction<any>) => {
            state.userData.eng_given_name = action.payload;
            state.isAuthenticated = true;
        },
        logout: (state) => {
            state.userData.eng_given_name = '';
            localStorage.removeItem('token');
            state.isAuthenticated = false;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserInfo.fulfilled, (state, action) => {
                state.userData.eng_given_name = action.payload;
            })
            .addCase(fetchUserInfo.rejected, (state, action) => {
            });
    }
});
// ---------------------------------------------------------------

export const login = createAsyncThunk(
    'auth/login',
    async (payload: { eng_given_name: string, password: string }) => {
        try {

            const response = await fetch('/auth/login', {
                method: 'POST',
                body: JSON.stringify(payload),
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error('登入失败');
            }
            const userData = await response.json();
            localStorage.setItem('token', userData.token);
            return userData;
        } catch (error) {
            console.error('登入失败:', error);
            throw error;
        }
    }
);

// ---------------------------------------------------------------

export const fetchUserInfo = createAsyncThunk(
    'auth/fetchUserInfo',
    async (_, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('Token not found');
            }

            const userInfo = await getUserInfo(token);
            return userInfo;
        } catch (error: any) {
            console.error('Error fetching user info:', error);
            return rejectWithValue(error.message);
        }
    }
)

//-------------------------------------------------------------------------------------------

export default authSlice.reducer;
export const { loginSuccess, logout } = authSlice.actions;