import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { get, getApiURL } from './config'

const initialState = {
    usersRecommended: [],
    isFetching: false,
    isSuccess: false,
    isError: false,
    errorMessage: ""
}

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

const usersRecommendedSlice = createSlice({
    name: 'usersRecommended',
    initialState,
    reducers: {
        resetState: state => initialState
    },
    extraReducers: {
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
    resetState
} = usersRecommendedSlice.actions
export default usersRecommendedSlice.reducer