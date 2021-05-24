import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { get, getApiURL } from './config'

const initialState = {
    posts: {},
    isFetching: false,
    isSuccess: false,
    isError: false,
    errorMessage: ""
}

export const getPosts = createAsyncThunk(
    'user/getPosts',
    async ({ nextURL }, thunkAPI) => {
        try {
            const response = await get({
                url: nextURL || getApiURL('post/posts')
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

const postSlice = createSlice({
    name: 'post',
    initialState,
    reducers: {
        clearStatus: (state) => {
            state.isFetching = false
            state.isError = false
            state.isSuccess = false
            state.errorMessage = ""
        },
        clearPost: (state) => initialState
    },
    extraReducers: {
        [getPosts.pending]: (state) => {
            state.isFetching = true
        },
        [getPosts.fulfilled]: (state, { payload }) => {
            state.posts = payload
            state.isFetching = false
            state.isSuccess = true
        },
        [getPosts.rejected]: (state, { payload }) => {
            state.isFetching = false
            state.isError = true
            state.errorMessage = payload
        },
    }
});

export const {
    clearStatus, clearPost
} = postSlice.actions
export default postSlice.reducer