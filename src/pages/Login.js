import { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import * as ROUTES from '../constants/Routes'
import { login, clearLogin, socialLogin, clearSocial } from '../features/authSlice'
import { useDispatch, useSelector } from 'react-redux'
import FacebookLogin from 'react-facebook-login';

const Login = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');

    const { loginState, social } = useSelector(state => state.auth)

    const isInvalid = username === '' || password === ''

    const handleLogin = (e) => {
        e.preventDefault();
        dispatch(login({ username, password }))
    }

    const fbResponse = (response) => {
        dispatch(socialLogin({ access_token: response.accessToken }))
    }

    useEffect(() => {
        if (loginState.isSuccess) {
            dispatch(clearLogin())
            history.push(ROUTES.DASHBOARD)
        }
        // eslint-disable-next-line 
    }, [loginState.isSuccess])

    useEffect(() => {
        if (social.isSuccess) {
            if (social.isNew) {
                dispatch(clearSocial())
                history.push(ROUTES.COMPLETE_PROFILE)
            } else {
                dispatch(clearSocial())
                history.push(ROUTES.DASHBOARD)
            }
        }
        // eslint-disable-next-line
    }, [social.isSuccess])

    useEffect(() => {
        document.title = 'Login • Instagram';
        if (localStorage.getItem('token')) {
            history.push(ROUTES.DASHBOARD)
        }
        // eslint-disable-next-line
    }, [])

    return (
        <div className="container flex mx-auto max-w-screen-md items-center h-screen justify-center">
            <div className="hidden md:flex w-3/5">
                <img src="/images/iphone-with-profile.jpg" alt="iphone with profile" />
            </div>

            <div className="flex flex-col w-5/6 md:w-1/2 md:mr-5 lg:mr-0 max-w-xs">
                {/* logo */}
                <div className="border border-gray-primary bg-white px-10 pt-10 pb-4 mb-3">
                    <h1 className="flex justify-center w-full">
                        <img src="/images/logo.png" alt="instagram" className="mt-2 w-8/12 mb-10" />
                    </h1>

                    <form className="flex flex-col gap-y-2 form" onSubmit={(e) => handleLogin(e)} method="POST">
                        <div className="field">
                            <input
                                id="username"
                                aria-label="Enter your username"
                                type="text"
                                placeholder="Username"
                                className="form-input text-xs text-gray-base w-full mr-3 
                            py-5 px-4 h-2 border border-gray-primary rounded
                            bg-gray-background focus:outline-none focus:border-gray-secondary"
                                onChange={({ target }) => setUserName(target.value)}
                            />
                            <label className="form-label" htmlFor="username">Username</label>
                        </div>
                        <div className="field">
                            <input
                                id="password"
                                aria-label="Password"
                                type="password"
                                placeholder="Password"
                                className="form-input text-xs text-gray-base w-full mr-3 
                            py-5 px-4 h-2 border border-gray-primary rounded
                            bg-gray-background focus:outline-none focus:border-gray-secondary"
                                onChange={({ target }) => setPassword(target.value)}
                            />
                            <label className="form-label" htmlFor="password">Password</label>
                        </div>
                        <button disabled={isInvalid} type="submit" className={`
                        bg-blue-medium mt-2  w-full rounded h-8 font-semibold text-sm text-white focus:outline-none
                        ${isInvalid && 'opacity-40'}`
                        }>
                            {
                                loginState.isFetching ? <img src="/svg/spinner.svg" className="h-full w-15 mx-auto" alt="spinner" /> :
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
                        {
                            social.isFetching ? (
                                <img src="/svg/spinner-gray.svg" className="h-10 w-10" alt="spinner" />
                            ) : (
                                <FacebookLogin
                                    textButton="Login with facebook"
                                    appId="549417432860509"
                                    fields="name,email,picture"
                                    callback={fbResponse}
                                    cssClass="p-0 text-sm focus:outline-none font-semibold flex"
                                    isMobile={false}
                                    redirectUri={window.location.href}
                                    icon={<img className="h-full mt-0.5 w-4 mr-2" src="/images/fb_logo.png" alt="fb-logo" />}
                                />
                            )
                        }

                    </p>
                    {/* error message */}
                    {loginState.errorMessage && <p className="mb-4 text-sm my-3 text-center text-red-primary ">{loginState.errorMessage}</p>}

                    {/* <p className="flex justify-center mt-4 text-blue-fb text-sm">
                        <Link to="/forgot">Forgot password?</Link>
                    </p> */}
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
