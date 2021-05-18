import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { get, getApiURL } from './config'

const initialState = {
    currentUser: {},
    usersRecommended: [],
    isFetching: false,
    isSuccess: false,
    isError: false,
    errorMessage: ""
}

export const userSelector = state => state.user

export const getUser = createAsyncThunk(
    'user/getUser',
    async (thunkAPI) => {
        try {
            const response = await get({
                url: getApiURL('accounts/user')
            })

            let data = response.data
            if (response.status === 200) {
                return data
            }
            else {
                return thunkAPI.rejectWithValue(data)
            }
        } catch (error) {
            if (!error.response) {
                console.log(error)
                return thunkAPI.rejectWithValue("Web server is down.")
            }
            console.log(error.response.data)
            const errorMessage = error.response.data
            return thunkAPI.rejectWithValue(errorMessage)
        }
    }
)

export const getUserRecommended = createAsyncThunk(
    'user/getUserRecommended',
    async (thunkAPI) => {
        try {
            const response = await get({
                url: getApiURL('accounts/users-recommended')
            })

            let data = response.data
            if (response.status === 200) {
                return data
            }
            else {
                return thunkAPI.rejectWithValue(data)
            }
        } catch (error) {
            if (!error.response) {
                console.log(error)
                return thunkAPI.rejectWithValue("Web server is down.")
            }
            console.log(error.response.data)
            const errorMessage = error.response.data
            return thunkAPI.rejectWithValue(errorMessage)
        }
    }
)

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        clearStatus: (state) => {
            state.isFetching = false
            state.isError = false
            state.isSuccess = false
            state.errorMessage = ""
        },
        clearUser: (state) => {
            state.currentUser = {}
            state.usersRecommended = []
        }
    },
    extraReducers: {
        [getUser.pending]: (state) => {
            state.isFetching = true
        },
        [getUser.fulfilled]: (state, { payload }) => {
            state.currentUser = payload
            state.isFetching = false
            state.isSuccess = true
        },
        [getUser.rejected]: (state, { payload }) => {
            state.isFetching = false
            state.isError = true
            state.errorMessage = payload
        },
        //get users recommented
        [getUserRecommended.pending]: (state) => {
            state.isFetching = true
        },
        [getUserRecommended.fulfilled]: (state, { payload }) => {
            state.usersRecommended = payload
            state.isFetching = false
            state.isSuccess = true
        },
        [getUserRecommended.rejected]: (state, { payload }) => {
            state.isFetching = false
            state.isError = true
            state.errorMessage = payload
        },
    }
});

export const {
    clearStatus,
    clearUser
} = userSlice.actions
export default userSlice.reducer