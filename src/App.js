import { useEffect } from 'react'
import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import * as ROUTERS from './constants/Routes'
import PrivateRoute from './helpers/PrivateRoute'
import IsLoggedIn from './helpers/isLoggedIn'
import CreatePostModal from './components/CreatePostModal'
import { useDispatch, useSelector } from 'react-redux'
import { getUser } from './features/userSlice'
import UserModal from './components/UserModal'
import PostModal from './components/profile/PostModal'

const Login = lazy(() => import('./pages/Login'));
const SignUp = lazy(() => import('./pages/SignUp'));
const DashBoard = lazy(() => import('./pages/DashBoard'));
const Profile = lazy(() => import('./pages/Profile'));
const NotFound = lazy(() => import('./pages/NotFound'));

function App() {
  const dispatch = useDispatch()
  const { isAuthenticated } = useSelector(state => state.auth)
  useEffect(() => {
    if (isAuthenticated || localStorage.getItem('token')) {
      dispatch(getUser())
    }
  }, [isAuthenticated, dispatch])

  return (
    <Router>
      <Suspense fallback={<p className="text-center">Loading...</p>}>
        <Switch>
          <PrivateRoute path={ROUTERS.DASHBOARD} exact>
            <DashBoard />
          </PrivateRoute>
          <Route exact path={ROUTERS.PROFILE} component={Profile} />

          <IsLoggedIn loggedInPath={ROUTERS.DASHBOARD} path={ROUTERS.LOGIN}>
            <Login />
          </IsLoggedIn>

          <IsLoggedIn loggedInPath={ROUTERS.DASHBOARD} path={ROUTERS.SIGNUP}>
            <SignUp />
          </IsLoggedIn>

          <Route component={NotFound} />
        </Switch>
        <UserModal />
        <CreatePostModal />
        <PostModal />
      </Suspense>
    </Router>
  );
}

export default App;
