import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { combineReducers } from 'redux'
import authReducer from '../features/authSlice'
import userReducer from '../features/userSlice'
import postReducer from '../features/postSlice'
import usersRecommendedReducer from '../features/usersRecommendedSlice'
import postsProfileReducer from '../features/postsProfileSlice'
import appMessageReducer from '../features/appMessageSlice'

const reducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  post: postReducer,
  usersRecommended: usersRecommendedReducer,
  postsProfile: postsProfileReducer,
  appMessage: appMessageReducer,
})

export const store = configureStore({
  reducer,
  middleware: getDefaultMiddleware({
    serializableCheck:
      false
  }),
});
