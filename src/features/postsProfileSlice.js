import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { get, getApiURL } from './config'

const initialState = {
    posts: [],
    isFetching: false,
    isSuccess: false,
    isError: false,
    errorMessage: ""
}

export const getPostsProfile = createAsyncThunk(
    'postsProfile/getPosts',
    async ({ username }, thunkAPI) => {
        try {
            const response = await get({
                url: getApiURL(`post/get-posts/${username}`)
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

const postsProfileSlice = createSlice({
    name: 'postsProfile',
    initialState,
    reducers: {
        clearPostsProfile: state => initialState
    },
    extraReducers: {
        [getPostsProfile.pending]: (state) => {
            state.isFetching = true
        },
        [getPostsProfile.fulfilled]: (state, { payload }) => {
            state.posts = payload
            state.isFetching = false
            state.isSuccess = true
        },
        [getPostsProfile.rejected]: (state, { payload }) => {
            state.isFetching = false
            state.isError = true
            state.errorMessage = payload
        },

    }
});

export const {
    clearPostsProfile
} = postsProfileSlice.actions
export default postsProfileSlice.reducer