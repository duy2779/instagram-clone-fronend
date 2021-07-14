import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';
import { getApiURL } from './config'

const initialState = {
    isAuthenticated: false,
    loginState: {
        isFetching: false,
        isSuccess: false,
        isError: false,
        errorMessage: "",
    },
    signupState: {
        isFetching: false,
        isSuccess: false,
        isError: false,
        errorMessage: "",
    },
    social: {
        isFetching: false,
        isSuccess: false,
        isError: false,
        errorMessage: "",
        isNew: false
    }
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

export const socialLogin = createAsyncThunk(
    'auth/socialLogin',
    async ({ access_token }, thunkAPI) => {
        let formData = new FormData();
        formData.append('access_token', access_token);
        try {
            const response = await axios.post(getApiURL('accounts/social-login'), formData)
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
        clearLogin: (state) => {
            state.loginState.isFetching = false
            state.loginState.isError = false
            state.loginState.isSuccess = false
            state.loginState.errorMessage = ""
        },
        clearSignup: (state) => {
            state.signupState.isFetching = false
            state.signupState.isError = false
            state.signupState.isSuccess = false
            state.signupState.errorMessage = ""
        },
        clearSocial: (state) => {
            state.social.isFetching = false
            state.social.isError = false
            state.social.isSuccess = false
            state.social.errorMessage = ""
            state.social.isNew = null
        },
        logOut: (state) => {
            localStorage.removeItem('token')
            state.isAuthenticated = false
        }
    },
    extraReducers: {
        [login.pending]: (state) => {
            state.loginState.isFetching = true
        },
        [login.fulfilled]: (state, { payload }) => {
            localStorage.setItem('token', payload.access)

            state.loginState.isFetching = false
            state.loginState.isSuccess = true
            state.isAuthenticated = true
        },
        [login.rejected]: (state, { payload }) => {
            state.loginState.isFetching = false
            state.loginState.isError = true
            state.loginState.errorMessage = payload
        },
        //social login
        [socialLogin.pending]: (state) => {
            state.social.isFetching = true
        },
        [socialLogin.fulfilled]: (state, { payload }) => {
            localStorage.setItem('token', payload.access)
            state.social.isNew = payload.is_new

            state.social.isFetching = false
            state.social.isSuccess = true
            state.isAuthenticated = true
        },
        [socialLogin.rejected]: (state, { payload }) => {
            state.social.isFetching = false
            state.social.isError = true
            state.social.errorMessage = payload
        },
        //sign up
        [signUp.pending]: (state) => {
            state.signupState.isFetching = true
        },
        [signUp.fulfilled]: (state) => {
            state.signupState.isFetching = false
            state.signupState.isSuccess = true
        },
        [signUp.rejected]: (state, { payload }) => {
            state.signupState.isFetching = false
            state.signupState.isError = true
            state.signupState.errorMessage = payload
        },
    }
});

export const {
    clearLogin,
    clearSignup,
    clearSocial,
    logOut
} = authSlice.actions
export default authSlice.reducer