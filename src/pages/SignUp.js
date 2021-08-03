import { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import * as ROUTES from '../constants/Routes'
import { authSelector, signUp, clearSignup, socialLogin, clearSocial } from '../features/authSlice'
import { useDispatch, useSelector } from 'react-redux'
import FacebookLogin from 'react-facebook-login';

const Signup = () => {
    const dispatch = useDispatch()
    const history = useHistory()

    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [fullname, setFullname] = useState('');
    const [emailOrPhone, setEmailOrPhone] = useState('');

    const { social, signupState } = useSelector(authSelector)

    const formIsInvalid = username === '' || password === '' || fullname === '' || emailOrPhone === ''

    const handleSignUp = (e) => {
        e.preventDefault();
        dispatch(signUp({ username, password, email: emailOrPhone, full_name: fullname }))

    }

    const fbResponse = (response) => {
        dispatch(socialLogin({ access_token: response.accessToken }))
    }

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
        if (signupState.isSuccess) {
            dispatch(clearSignup())
            history.push(ROUTES.LOGIN)
        }
    }, [signupState.isSuccess, dispatch, history])

    useEffect(() => {
        dispatch(clearSignup())
        document.title = 'Signup • Instagram';
        if (localStorage.getItem('token')) {
            history.push(ROUTES.DASHBOARD)
        }
        // eslint-disable-next-line
    }, [])

    return (
        <div className="container flex mx-auto max-w-screen-md items-center h-screen">
            <div className="flex flex-col md:w-1/2 mx-auto">
                <div className="md:border md:border-gray-primary md:bg-white px-10 pt-10 pb-4 mb-3">
                    {/* logo */}
                    <h1 className="flex justify-center w-full">
                        <img src="/images/logo.png" alt="instagram" className="mt-2 w-8/12 mb-4" />
                    </h1>

                    <p className="font-semibold text-center text-lg mb-5 text-gray-secondary">Sign up to see photos and videos from your friends.</p>
                    {/* <button className="
                        bg-blue-medium  w-full rounded h-8 font-semibold text-sm text-white focus:outline-none mb-6">
                        Log in with Facebook
                    </button> */}
                    {
                        social.isFetching ? (
                            <button disabled type="submit" className=
                                "bg-blue-medium  w-full rounded h-8 font-semibold text-sm text-white focus:outline-none mb-6">

                                <img src="/svg/spinner.svg" className="h-full w-15 mx-auto" alt="spinner" />
                            </button>
                        ) : (
                            <FacebookLogin
                                textButton="Login with facebook"
                                appId="549417432860509"
                                fields="name,email,picture"
                                callback={fbResponse}
                                cssClass="bg-blue-medium  w-full rounded h-8 font-semibold text-sm text-white focus:outline-none mb-6"
                            />
                        )
                    }

                    {/* or line */}
                    <p className="text-sm w-full text-center border-b border-gray-primary mb-6"
                        style={{ lineHeight: '0.1em' }}>
                        <span
                            className="md:bg-white bg-gray-background px-5 text-gray-secondary font-semibold"
                            style={{ fontSize: '0.875em' }}
                        >OR</span>
                    </p>

                    <form className="flex flex-col gap-y-2 form" onSubmit={(e) => handleSignUp(e)} method="POST">
                        <div className="field">
                            <input
                                id="email"
                                aria-label="Enter your email"
                                type="text"
                                placeholder="Email"
                                className="form-input text-xs text-gray-base w-full mr-3 
                                py-5 px-4 h-2 border border-gray-primary rounded 
                                bg-gray-background focus:outline-none focus:border-gray-secondary"
                                onChange={({ target }) => setEmailOrPhone(target.value)}
                            />
                            <label className="form-label" htmlFor="email">Email</label>
                            {/* <i class="text-2xl text-red-500 absolute far fa-times-circle right-2 bottom-3"></i> */}
                        </div>
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
                                id="fullname"
                                aria-label="Enter your fullname"
                                type="text"
                                placeholder="Full Name"
                                className="form-input text-xs text-gray-base w-full mr-3 
                            py-5 px-4 h-2 border border-gray-primary rounded 
                            bg-gray-background focus:outline-none focus:border-gray-secondary"
                                onChange={({ target }) => setFullname(target.value)}
                            />
                            <label className="form-label" htmlFor="fullname">Fullname</label>
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
                        <button disabled={formIsInvalid} type="submit" className={`
                        bg-blue-medium mt-2  w-full rounded h-8 font-semibold text-sm text-white focus:outline-none
                        ${formIsInvalid && 'opacity-40'}`
                        }>
                            {
                                signupState.isFetching ? <img src="/svg/spinner.svg" className="h-full w-15 mx-auto" alt="spinner" /> :
                                    'Sign up'
                            }
                        </button>
                    </form>

                    {/* error message */}
                    {signupState.errorMessage && <p className="mt-5 text-sm my-3 text-center text-red-primary ">{signupState.errorMessage}</p>}

                    {/* term */}
                    <p className="text-center mt-6 text-xs text-gray-secondary w-4/5 mx-auto mb-3">
                        By signing up, you agree to our
                        <span className="font-semibold"> Terms</span> ,
                        <span className="font-semibold"> Data Policy </span>and
                        <span className="font-semibold"> Cookies Policy</span>  .
                    </p>
                </div>
                {/* sign up link */}
                <div className="flex justify-center items-center flex-col w-full md:bg-white p-4 md:border md:border-gray-primary">
                    <p className="text-sm">
                        Have an account?
                        <Link to={ROUTES.LOGIN} className="font-semibold text-blue-medium"> Login</Link>
                    </p>
                </div>
            </div>

        </div>
    )
}

export default Signup