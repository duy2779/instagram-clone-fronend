import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import * as ROUTERS from './constants/Routes'
import PrivateRoute from './helpers/PrivateRoute'
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
          <Route path={ROUTERS.LOGIN} component={Login} />
          <Route path={ROUTERS.SIGNUP} component={SignUp} />
          <Route component={NotFound} />
        </Switch>
        <CreatePostModal />
      </Suspense>
    </Router>
  );
}

export default App;
