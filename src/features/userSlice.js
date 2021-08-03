import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { get, post, getApiURL, patch } from './config'

const initialState = {
    currentUser: {},
    userFocus: {},
    unFollowUserModal: {
        show: false,
        username: '',
        avatar: ''
    },
    followUserState: {
        loading: {},
    },
    upload_info: {
        pending: false,
        success: false,
        error: false,
        error_message: "",
    }
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

export const getUserByUserName = createAsyncThunk(
    'user/getUserByUserName',
    async ({ username }, thunkAPI) => {
        try {
            const response = await get({
                url: getApiURL(`accounts/user/${username}`)
            })

            let data = response.data
            if (response.status === 200) {
                return data
            }
            else {
                if (response.status === 204)
                    return thunkAPI.rejectWithValue({ message: data, exists: false })
            }
        } catch (error) {
            if (!error.response) {
                console.log(error)
                return thunkAPI.rejectWithValue({ message: "Web server is down." })
            }
            console.log(error.response.data)
            const errorMessage = error.response.data
            return thunkAPI.rejectWithValue({ message: errorMessage })
        }
    }
)

export const followUser = createAsyncThunk(
    'user/followUser',
    async (username, thunkAPI) => {
        try {
            const response = await post({
                url: getApiURL(`accounts/follow/${username}`)
            })

            let data = response.data
            if (response.status === 200) {
                const { user } = thunkAPI.getState().user.userFocus
                user &&
                    await thunkAPI.dispatch(getUserByUserName({ username: user.username }))
                await thunkAPI.dispatch(getUser())
                return username
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

export const updateAvatar = createAsyncThunk(
    'user/updateAvatar',
    async ({ avatar }, thunkAPI) => {
        try {
            let formData = new FormData();
            formData.append('avatar', avatar);

            const response = await patch({
                url: getApiURL(`accounts/update-avatar`),
                payload: formData
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

export const updateInfo = createAsyncThunk(
    'user/updateInfo',
    async (user, thunkAPI) => {
        try {
            const response = await patch({
                url: getApiURL(`accounts/update-info`),
                payload: user
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
        clearUpdateInfo: (state) => {
            state.upload_info = initialState.upload_info
        },
        clearUpdateInfoStatus: (state) => {
            state.upload_info = {
                ...state.upload_info,
                pending: false,
                success: false,
                error: false,
            }
        },
        clearUser: (state) => {
            state.currentUser = {}
        },
        showUnFollowUserModal: (state, { payload }) => {
            let modal = state.unFollowUserModal
            modal.show = true
            modal.username = payload.username
            modal.avatar = payload.avatar_pic

            state.unFollowUserModal = modal
        },
        hideUnFollowUserModal: (state) => {
            state.unFollowUserModal = initialState.unFollowUserModal
        },
        clearUserFocus(state) {
            state.userFocus = initialState.userFocus
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
        //get user by username 
        [getUserByUserName.pending]: (state) => {
            state.userFocus.isFetching = true
        },
        [getUserByUserName.fulfilled]: (state, { payload }) => {
            state.userFocus.user = payload
            state.userFocus.isFetching = false
            state.userFocus.isSuccess = true
        },
        [getUserByUserName.rejected]: (state, { payload }) => {
            state.userFocus.isFetching = false
            state.userFocus.isError = true
            state.userFocus.errorMessage = payload.message
        },
        //folow user
        [followUser.pending]: (state, { meta }) => {
            state.followUserState.loading[meta.arg] = true;
        },
        [followUser.fulfilled]: (state, { meta }) => {
            state.followUserState.loading[meta.arg] = false;
        },
        [followUser.rejected]: (state, { payload, meta }) => {
            state.followUserState.loading[meta.arg] = false;
            state.followUserState.error = payload
        },
        //update avatar
        [updateAvatar.pending]: (state) => {
            state.isFetching = true
        },
        [updateAvatar.fulfilled]: (state, { payload }) => {
            state.currentUser.avatar_pic = payload.user.avatar_pic
            state.isFetching = false
            state.isSuccess = true
        },
        [updateAvatar.rejected]: (state, { payload }) => {
            state.isFetching = false
            state.isError = true
            state.errorMessage = payload
        },
        //update info
        [updateInfo.pending]: (state) => {
            state.upload_info.pending = true
            state.upload_info.error_message = ''
        },
        [updateInfo.fulfilled]: (state, { payload }) => {
            state.upload_info.pending = false
            state.currentUser = payload.user
            state.upload_info.success = true
        },
        [updateInfo.rejected]: (state, { payload }) => {
            state.upload_info.pending = false
            state.upload_info.error = true
            state.upload_info.error_message = payload
        },
    }
});

export const {
    clearStatus,
    clearUser,
    showUnFollowUserModal,
    hideUnFollowUserModal,
    clearUserFocus,
    clearUpdateInfo,
    clearUpdateInfoStatus,
} = userSlice.actions
export default userSlice.reducer