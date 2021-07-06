import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { get, post, postWithFile, getApiURL } from './config'

const initialState = {
    posts: {},
    createPostModal: {
        show: false,
        image: '',
        imagePreview: ''
    },
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

export const postToggleLike = createAsyncThunk(
    'user/toggleLike',
    async ({ postID }, thunkAPI) => {
        try {
            const response = await post({
                url: getApiURL(`post/toggle-like/${postID}`)
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

export const addComment = createAsyncThunk(
    'user/addComment',
    async ({ post_id, comment }, thunkAPI) => {
        try {
            const response = await post({
                url: getApiURL(`post/add-comment/${post_id}`),
                payload: { comment }
            })

            let data = response.data
            if (response.status === 201) {
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

export const createPost = createAsyncThunk(
    'user/createPost',
    async ({ caption, image }, thunkAPI) => {
        try {
            let formData = new FormData()
            formData.append('caption', caption)
            formData.append('image', image)
            const response = await postWithFile({
                url: getApiURL(`post/create-post`),
                payload: formData
            })

            let data = response.data
            if (response.status === 201) {
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
        clearPost: (state) => initialState,
        showCreatePostModal: (state, { payload }) => {
            let modal = state.createPostModal
            console.log(payload)
            modal.show = true
            modal.image = payload.image
            modal.imagePreview = payload.imagePreview

            state.createPostModal = modal
        },
        hideCreatePostModal: (state) => {
            let modal = state.createPostModal
            modal.show = false
            modal.image = ''
            modal.imagePreview = ''
            state.createPostModal = modal
        }
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

        //toggle like
        [postToggleLike.pending]: (state) => {
            state.isFetching = true
        },
        [postToggleLike.fulfilled]: (state) => {
            state.isFetching = false
            state.isSuccess = true
        },
        [postToggleLike.rejected]: (state, { payload }) => {
            state.isFetching = false
            state.isError = true
            state.errorMessage = payload
        },
        //add comment
        [addComment.pending]: (state) => {
            state.isFetching = true
        },
        [addComment.fulfilled]: (state) => {
            state.isFetching = false
            state.isSuccess = true
        },
        [addComment.rejected]: (state, { payload }) => {
            state.isFetching = false
            state.isError = true
            state.errorMessage = payload
        },
        //create post
        [createPost.pending]: (state) => {
            state.isFetching = true
        },
        [createPost.fulfilled]: (state) => {
            state.isFetching = false
            state.isSuccess = true
        },
        [createPost.rejected]: (state, { payload }) => {
            state.isFetching = false
            state.isError = true
            state.errorMessage = payload
        },
    }
});

export const {
    clearStatus, clearPost, showCreatePostModal, hideCreatePostModal
} = postSlice.actions
export default postSlice.reducer