import { Link, useHistory } from "react-router-dom"
import * as ROUTES from '../constants/Routes'
import { logOut } from "../features/authSlice"
import { clearUser } from "../features/userSlice"
import { useDispatch, useSelector } from 'react-redux'
import UploadImageButton from './UploadImageButton'
import ProfileMenuActions from './ProfileMenuActions'
import SearchInput from "./SearchInput"
import NotificationButton from "./NotificationButton"

const Header = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const { currentUser } = useSelector(state => state.user)

    const logOutOnClick = () => {
        dispatch(logOut())
        dispatch(clearUser())
        history.push(ROUTES.LOGIN)
    }

    return (
        <header className="bg-white h-14 border-b border-gray-primary md:mb-8 sticky top-0 z-10">
            <div className="container mx-auto md:max-w-screen-lg h-full">
                <div className="flex px-4 lg:px-0 justify-between h-full">
                    <div className="text-gray-700 w-28 text-center flex item-center align-items cursor-pointer">
                        <h1 className="flex justify-center w-full">
                            <Link to={ROUTES.DASHBOARD} aria-label="Instagram logo" onClick={() => window.scroll(0,0)}>
                                <img src="/images/logo.png" alt="instagram" className="w-11/12 mt-4 object-cover" />
                            </Link>
                        </h1>
                    </div>
                    {/* search input */}
                    <SearchInput />

                    <div className="flex gap-x-5 items-center justify-between">
                        <Link to={ROUTES.DASHBOARD} onClick={() => window.scroll(0,0)}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                            </svg>
                        </Link>
                        <UploadImageButton />
                        {/* <button>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                            </svg>
                        </button> */}
                        <NotificationButton />
                        {/* avatar link */}
                        <ProfileMenuActions user={currentUser} logOutOnClick={logOutOnClick} />

                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header
