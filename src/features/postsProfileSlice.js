import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { get, remove, getApiURL } from './config'

const initialState = {
    posts: [],
    postModal: {
        show: false,
        post: {}
    },
    postActionsModal: {
        post: {},
        show: false,
    },
    deletePostConfirm: {
        postID: null,
        show: false,
    },
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

export const deletePost = createAsyncThunk(
    'postsProfile/deletePost',
    async ({ postID }, thunkAPI) => {
        try {
            const response = await remove({
                url: getApiURL(`post/delete-post/${postID}`)
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
        clearPostsProfile: state => initialState,
        showPostModal: (state, { payload }) => {
            state.postModal.post = payload.photo
            state.postModal.show = true
        },
        hidePostModal: (state) => {
            state.postModal.post = {}
            state.postModal.show = false
        },
        showPostActionsModal: (state, { payload }) => {
            state.postActionsModal.post = payload.post
            state.postActionsModal.show = true
        },
        hidePostActionsModal: (state) => {
            state.postActionsModal.post = {}
            state.postActionsModal.show = false
        },
        showDeletePostConfirm: (state, { payload }) => {
            state.deletePostConfirm.postID = payload.postID
            state.deletePostConfirm.show = true
        },
        hideDeletePostConfirm: (state) => {
            state.deletePostConfirm.postID = null
            state.deletePostConfirm.show = false
        }
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
        //delete post
        [deletePost.pending]: (state) => {
            state.isFetching = true
        },
        [deletePost.fulfilled]: (state) => {
            state.isFetching = false
            state.isSuccess = true
        },
        [deletePost.rejected]: (state, { payload }) => {
            state.isFetching = false
            state.isError = true
            state.errorMessage = payload
        },

    }
});

export const {
    clearPostsProfile,
    showPostModal,
    hidePostModal,
    showPostActionsModal,
    hidePostActionsModal,
    showDeletePostConfirm,
    hideDeletePostConfirm
} = postsProfileSlice.actions
export default postsProfileSlice.reducer