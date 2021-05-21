import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux'
import authReducer from '../features/authSlice'
import userReducer from '../features/userSlice'
import postReducer from '../features/postSlice'

const reducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  post: postReducer,
})

export const store = configureStore({
  reducer
});
