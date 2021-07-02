import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    message: '',
    show: false,
}

const appMessageSlice = createSlice({
    name: 'appMessage',
    initialState,
    reducers: {
        showMessage: (state, {payload}) => {
            state.message = payload.message
            state.show = true
        },
        hideMessage: (state) => {
            state.message = ''
            state.show = false
        }
    }
});

export const {
    showMessage,
    hideMessage
} = appMessageSlice.actions
export default appMessageSlice.reducer