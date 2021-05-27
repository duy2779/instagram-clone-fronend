import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import * as ROUTERS from './constants/Routes'
import PrivateRoute from './helpers/PrivateRoute'
import IsLoggedIn from './helpers/isLoggedIn'
import CreatePostModal from './components/CreatePostModal'

const Login = lazy(() => import('./pages/Login'));
const SignUp = lazy(() => import('./pages/SignUp'));
const DashBoard = lazy(() => import('./pages/DashBoard'));
const NotFound = lazy(() => import('./pages/NotFound'));

function App() {
  return (
    <Router>
      <Suspense fallback={<p className="text-center">Loading...</p>}>
        <Switch>
          <PrivateRoute path={ROUTERS.DASHBOARD} exact>
            <DashBoard />
          </PrivateRoute>

          <IsLoggedIn loggedInPath={ROUTERS.DASHBOARD} path={ROUTERS.LOGIN}>
            <Login />
          </IsLoggedIn>

          <IsLoggedIn loggedInPath={ROUTERS.DASHBOARD} path={ROUTERS.SIGNUP}>
            <SignUp />
          </IsLoggedIn>

          <Route component={NotFound} />
        </Switch>
        <CreatePostModal />
      </Suspense>
    </Router>
  );
}

export default App;
