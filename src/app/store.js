import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux'
import authReducer from '../features/authSlice'
import userReducer from '../features/userSlice'

const reducer = combineReducers({
  auth: authReducer,
  user: userReducer
})

export const store = configureStore({
  reducer
});
