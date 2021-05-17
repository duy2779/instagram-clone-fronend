import React from 'react';
import { Redirect, Route } from "react-router"
import * as ROUTES from '../constants/Routes'

const PrivateRoute = ({ children, ...rest }) => {
    return (
        <Route
            {...rest}
            render={({ location }) => {
                if (localStorage.getItem('token')) {
                    return React.cloneElement(children)
                }
                else {
                    return (
                        <Redirect
                            to={{
                                pathname: ROUTES.LOGIN,
                                state: { from: location }
                            }}
                        />
                    )
                }
            }}
        />
    )
}

export default PrivateRoute
