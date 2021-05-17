import { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import * as ROUTES from '../constants/Routes'
import { authSelector, login, clearAuth } from '../features/authSlice'
import { useDispatch, useSelector } from 'react-redux'

const Login = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');

    const { errorMessage, isSuccess, isFetching } = useSelector(authSelector)

    const isInvalid = username === '' || password === ''

    const handleLogin = (e) => {
        e.preventDefault();
        dispatch(login({ username, password }))

    }

    useEffect(() => {
        if (isSuccess) {
            dispatch(clearAuth())
            history.push(ROUTES.DASHBOARD)
        }
    }, [isSuccess, dispatch, history])

    useEffect(() => {
        dispatch(clearAuth())
        document.title = 'Login • Instagram';
    }, [dispatch])

    return (
        <div className="container flex mx-auto max-w-screen-md items-center h-screen">
            <div className="flex w-3/5">
                <img src="/images/iphone-with-profile.jpg" alt="iphone with profile" />
            </div>

            <div className="flex flex-col w-1/2">
                {/* logo */}
                <div className="border border-gray-primary bg-white px-10 pt-10 pb-4 mb-3">
                    <h1 className="flex justify-center w-full">
                        <img src="/images/logo.png" alt="instagram" className="mt-2 w-8/12 mb-10" />
                    </h1>

                    <form onSubmit={(e) => handleLogin(e)} method="POST">
                        <input
                            aria-label="Enter your username"
                            type="text"
                            placeholder="Phone number, username or email"
                            className="text-xs text-gray-base w-full mr-3 
                            py-5 px-4 h-2 border border-gray-primary rounded mb-2 
                            bg-gray-background focus:outline-none focus:border-gray-secondary"
                            onChange={({ target }) => setUserName(target.value)}
                        />
                        <input
                            aria-label="Password"
                            type="password"
                            placeholder="Password"
                            className="text-xs text-gray-base w-full mr-3 
                            py-5 px-4 h-2 border border-gray-primary rounded mb-4
                            bg-gray-background focus:outline-none focus:border-gray-secondary"
                            onChange={({ target }) => setPassword(target.value)}
                        />
                        <button disabled={isInvalid} type="submit" className={`
                        bg-blue-medium  w-full rounded h-8 font-semibold text-sm text-white focus:outline-none
                        ${isInvalid && 'opacity-40'}`
                        }>
                            {
                                isFetching ? <img src="/svg/spinner.svg" className="h-full w-15 mx-auto" alt="spinner" /> :
                                    'Log In'
                            }
                        </button>
                    </form>
                    {/* or line */}
                    <p className="text-sm w-full text-center border-b-2 border-gray-primary mt-6"
                        style={{ lineHeight: '0.1em' }}>
                        <span
                            className="bg-white px-5 text-gray-secondary font-semibold"
                            style={{ fontSize: '0.875em' }}
                        >OR</span>
                    </p>
                    {/* fb link */}
                    <p className="flex justify-center mt-6 font-semibold text-blue-fb text-sm">
                        <img className="h-full mt-0.5 w-4 mr-2" src="/images/fb_logo.png" alt="fb-logo" />
                        <Link to="/fb">Login with Facebook</Link>
                    </p>
                    {/* error message */}
                    {errorMessage && <p className="mb-4 text-sm my-3 text-center text-red-primary ">{errorMessage}</p>}

                    <p className="flex justify-center mt-4 text-blue-fb text-sm">
                        <Link to="/forgot">Forgot password?</Link>
                    </p>
                </div>
                {/* sign up link */}
                <div className="flex justify-center items-center flex-col w-full bg-white p-4 border border-gray-primary">
                    <p className="text-sm">
                        Don't have an account?
                        <Link to={ROUTES.SIGNUP} className="font-semibold text-blue-medium"> Sign up</Link>
                    </p>
                </div>
            </div>

        </div>
    )
}

export default Login
