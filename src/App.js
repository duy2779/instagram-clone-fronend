import { useEffect } from 'react'
import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import * as ROUTERS from './constants/Routes'
import PrivateRoute from './helpers/PrivateRoute'
import CreatePostModal from './components/CreatePostModal'
import { useDispatch, useSelector } from 'react-redux'

import { getUser } from './features/userSlice'
import UserModal from './components/UserModal'
import DeletePostConfirm from './components/DeletePostConfirm'
import PostActionsModal from './components/PostActionsModal'
import PostModal from './components/profile/PostModal'
import AppMessage from './components/AppMessage';
import LoadingPage from './components/LoadingPage';

const Login = lazy(() => import('./pages/Login'));
const CompleteProfile = lazy(() => import('./pages/CompleteProfile'));
const SignUp = lazy(() => import('./pages/SignUp'));
const DashBoard = lazy(() => import('./pages/DashBoard'));
const Profile = lazy(() => import('./pages/Profile'));
const ProfileEdit = lazy(() => import('./pages/ProfileEdit'));
const Post = lazy(() => import('./pages/Post'));
const NotFound = lazy(() => import('./pages/NotFound'));

function App() {
  const dispatch = useDispatch()
  const { isAuthenticated } = useSelector(state => state.auth)
  const { unFollowUserModal } = useSelector(state => state.user)
  const { deletePostConfirm, postActionsModal, postModal } = useSelector(state => state.postsProfile)
  const { createPostModal } = useSelector(state => state.post)
  useEffect(() => {
    if (isAuthenticated || localStorage.getItem('token')) {
      dispatch(getUser())
    }
  }, [isAuthenticated, dispatch])

  return (
    <Router>

      <Suspense fallback={<LoadingPage />}>
        <Switch>
          <PrivateRoute path={ROUTERS.DASHBOARD} exact>
            <DashBoard />
          </PrivateRoute>
          <Route exact path={ROUTERS.PROFILE_EDIT} component={ProfileEdit} />
          <Route exact path={ROUTERS.COMPLETE_PROFILE} component={CompleteProfile} />
          <Route exact path={ROUTERS.PROFILE} component={Profile} />
          <Route exact path={ROUTERS.POST} component={Post} />

          <Route exact path={ROUTERS.LOGIN} component={Login} />
          <Route exact path={ROUTERS.SIGNUP} component={SignUp} />

          <Route component={NotFound} />
        </Switch>
        <AppMessage />
        {
          unFollowUserModal.show && <UserModal />
        }
        {
          deletePostConfirm.show && <DeletePostConfirm />
        }
        {
          postActionsModal.show && <PostActionsModal />
        }
        {
          postModal.show && <PostModal />
        }
        {
          createPostModal.show && <CreatePostModal />
        }
      </Suspense>
    </Router>
  );
}

export default App;
