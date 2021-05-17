import { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import * as ROUTES from '../constants/Routes'
import { authSelector, signUp, clearAuth } from '../features/authSlice'
import { useDispatch, useSelector } from 'react-redux'

const Login = () => {
    const dispatch = useDispatch()
    const history = useHistory()

    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [fullname, setFullname] = useState('');
    const [emailOrPhone, serEmailOrPhone] = useState('');

    const { errorMessage, isSuccess, isFetching } = useSelector(authSelector)

    const formIsInvalid = username === '' || password === '' || fullname === '' || emailOrPhone === ''

    const handleSignUp = (e) => {
        e.preventDefault();
        dispatch(signUp({ username, password, email: emailOrPhone, full_name: fullname }))

    }

    useEffect(() => {
        if (isSuccess) {
            dispatch(clearAuth())
            history.push(ROUTES.DASHBOARD)
        }
    }, [isSuccess, dispatch, history])

    useEffect(() => {
        dispatch(clearAuth())
        document.title = 'Signup • Instagram';
    }, [dispatch])

    return (
        <div className="container flex mx-auto max-w-screen-md items-center h-screen">
            <div className="flex flex-col md:w-1/2 mx-auto">
                <div className="md:border md:border-gray-primary md:bg-white px-10 pt-10 pb-4 mb-3">
                    {/* logo */}
                    <h1 className="flex justify-center w-full">
                        <img src="/images/logo.png" alt="instagram" className="mt-2 w-8/12 mb-4" />
                    </h1>

                    <p className="font-semibold text-center text-lg mb-5 text-gray-secondary">Sign up to see photos and videos from your friends.</p>
                    <button className="
                        bg-blue-medium  w-full rounded h-8 font-semibold text-sm text-white focus:outline-none mb-6">
                        Log in with Facebook
                    </button>

                    {/* or line */}
                    <p className="text-sm w-full text-center border-b border-gray-primary mb-6"
                        style={{ lineHeight: '0.1em' }}>
                        <span
                            className="md:bg-white bg-gray-background px-5 text-gray-secondary font-semibold"
                            style={{ fontSize: '0.875em' }}
                        >OR</span>
                    </p>

                    <form onSubmit={(e) => handleSignUp(e)} method="POST">
                        <div className="relative">
                            <input
                                aria-label="Enter your email or phone"
                                type="text"
                                placeholder="Mobile Number or Email"
                                className="text-xs text-gray-base w-full mr-3 
                                py-5 px-4 h-2 border border-gray-primary rounded mb-2 
                                bg-gray-background focus:outline-none focus:border-gray-secondary"
                                onChange={({ target }) => serEmailOrPhone(target.value)}
                            />
                            {/* <i class="text-2xl text-red-500 absolute far fa-times-circle right-2 bottom-3"></i> */}
                        </div>
                        <input
                            aria-label="Enter your username"
                            type="text"
                            placeholder="Username"
                            className="text-xs text-gray-base w-full mr-3 
                            py-5 px-4 h-2 border border-gray-primary rounded mb-2 
                            bg-gray-background focus:outline-none focus:border-gray-secondary"
                            onChange={({ target }) => setUserName(target.value)}
                        />
                        <input
                            aria-label="Enter your fullname"
                            type="text"
                            placeholder="Full Name"
                            className="text-xs text-gray-base w-full mr-3 
                            py-5 px-4 h-2 border border-gray-primary rounded mb-2 
                            bg-gray-background focus:outline-none focus:border-gray-secondary"
                            onChange={({ target }) => setFullname(target.value)}
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
                        <button disabled={formIsInvalid} type="submit" className={`
                        bg-blue-medium  w-full rounded h-8 font-semibold text-sm text-white focus:outline-none
                        ${formIsInvalid && 'opacity-40'}`
                        }>
                            {
                                isFetching ? <img src="/svg/spinner.svg" className="h-full w-15 mx-auto" alt="spinner" /> :
                                    'Sign up'
                            }
                        </button>
                    </form>

                    {/* error message */}
                    {errorMessage && <p className="mt-5 text-sm my-3 text-center text-red-primary ">{errorMessage}</p>}

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

export default Login
