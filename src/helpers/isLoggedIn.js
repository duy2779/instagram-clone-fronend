import React from 'react';
import { Redirect, Route } from "react-router"

const PrivateRoute = ({ loggedInPath, children, ...rest }) => {
    return (
        <Route
            {...rest}
            render={({ location }) => {
                if (!localStorage.getItem('token')) {
                    return React.cloneElement(children)
                }
                else {
                    return (
                        <Redirect
                            to={{
                                pathname: loggedInPath,
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
