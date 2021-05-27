import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';
import { getApiURL } from './config'

const initialState = {
    isAuthenticated: false,
    isFetching: false,
    isSuccess: false,
    isError: false,
    errorMessage: ""
}

export const authSelector = state => state.auth

export const login = createAsyncThunk(
    'auth/login',
    async ({ username, password }, thunkAPI) => {
        try {
            const response = await axios.post(getApiURL('accounts/login'), {
                username, password
            })
            let data = response.data

            if (response.status === 200) {
                return data
            } else {
                return thunkAPI.rejectWithValue(data)
            }
        } catch (error) {
            if (!error.response) {
                console.log(error)
                return thunkAPI.rejectWithValue("Web sever is down.")
            }
            console.log(error.response.data)
            const errorMessage = error.response.data
            return thunkAPI.rejectWithValue(errorMessage)
        }
    }
)

export const signUp = createAsyncThunk(
    'auth/signUp',
    async ({ username, password, full_name, email }, thunkAPI) => {
        try {
            const response = await axios.post(getApiURL('accounts/register'), {
                username, password, full_name, email
            })
            let data = response.data

            if (response.status === 201) {
                return data
            } else {
                return thunkAPI.rejectWithValue(data)
            }
        } catch (error) {
            if (!error.response) {
                console.log(error)
                return thunkAPI.rejectWithValue("Web server is down.")
            }
            const errorMessage = error.response.data.error_message
            console.log(errorMessage)
            if (errorMessage['username']) {
                return thunkAPI.rejectWithValue("This username isn't available. Please try another.")
            }
            if (errorMessage['email'][0] === 'Enter a valid email address.') {
                return thunkAPI.rejectWithValue("Your email address doesn't valid")
            }
            if (errorMessage['email']) {
                return thunkAPI.rejectWithValue("Another account is using " + email)
            }
            return thunkAPI.rejectWithValue("An unknown error. Please try later")
        }
    }
)

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        clearAuth: (state) => {
            state.isFetching = false
            state.isError = false
            state.isSuccess = false
            state.errorMessage = ""
        },
        logOut: (state) => {
            localStorage.removeItem('token')
            state.isAuthenticated = false
        }
    },
    extraReducers: {
        [login.pending]: (state) => {
            state.isFetching = true
        },
        [login.fulfilled]: (state, { payload }) => {
            localStorage.setItem('token', payload.access)

            state.isFetching = false
            state.isSuccess = true
            state.isAuthenticated = true
        },
        [login.rejected]: (state, { payload }) => {
            state.isFetching = false
            state.isError = true
            state.errorMessage = payload
        },
        //sign up
        [signUp.pending]: (state) => {
            state.isFetching = true
        },
        [signUp.fulfilled]: (state) => {
            state.isFetching = false
            state.isSuccess = true
        },
        [signUp.rejected]: (state, { payload }) => {
            state.isFetching = false
            state.isError = true
            state.errorMessage = payload
        },
    }
});

export const {
    clearAuth,
    logOut
} = authSlice.actions
export default authSlice.reducer