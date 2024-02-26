
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { getUserInfo } from '../hook/userAPI';
import { useDateField } from '@mui/x-date-pickers/DateField/useDateField';
import { jwtDecode } from "jwt-decode";

// ---------------------------------------------------------------


interface AuthState {
    isAuthenticated: boolean;
    role: string
    userData: {
        eng_given_name: string
    }
}

// ---------------------------------------------------------------
const token = localStorage.getItem('token');
const isAuthenticated = !!token;


const initialStateFunc = () => {
    let data = {
        isAuthenticated: isAuthenticated,
        role: '',
        userData: {
            eng_given_name: ''
        }
    }
    const token = localStorage.getItem("token")
    console.log(token)

    if (token) {
        const decoded: any = jwtDecode(token);
        data = {
            isAuthenticated: true,
            role: decoded.role,
            userData: {
                eng_given_name: decoded.data
            }
        }
    }
    return data
}

const initialState: AuthState = initialStateFunc()

// ---------------------------------------------------------------

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginSuccess: (state, action: PayloadAction<{ username: string; role: string }>) => {
            const payload = action.payload;
            if (payload) {
                console.log({ payload })

                state.userData.eng_given_name = payload.username;
                state.role = action.payload.role
                state.isAuthenticated = true;
            }
        },
        logout: (state) => {
            state.userData.eng_given_name = '';
            localStorage.removeItem('token');
            state.isAuthenticated = false;
            state.role = ''



        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserInfo.fulfilled, (state, action) => {
                state.userData.eng_given_name = action.payload;
                state.isAuthenticated = true;
            })
            .addCase(fetchUserInfo.rejected, (state, action) => {
                state.isAuthenticated = false;
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
    async (_, { rejectWithValue, dispatch }) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                dispatch(logout());
                throw new Error('Token not found');
            }

            const response = await fetch('/auth/validateToken', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                dispatch(logout());
                throw new Error('Token is invalid');
            }
            const userData = await response.json();
            dispatch(loginSuccess({ username: 'username', role: 'role' }));
            return userData.username;
        } catch (error: any) {
            dispatch(logout());
            throw error;
        }
    }
);


//-------------------------------------------- Joy joy, a joke what are you look up?-----------------------------------------------

export default authSlice.reducer;
export const { loginSuccess, logout } = authSlice.actions;