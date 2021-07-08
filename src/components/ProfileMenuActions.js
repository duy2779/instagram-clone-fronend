import { backendURL } from '../constants/BackendConfig'
import Skeleton from 'react-loading-skeleton'
import { useState } from 'react'
import { Link } from 'react-router-dom'

const ProfileMenuActions = ({ user, logOutOnClick }) => {
    const [menuShow, setMenuShow] = useState(false)

    return (
        user.avatar_pic ? (
            <div className="relative">
                <button
                    className={`relative mt-1 focus:outline-none p-0.5 border rounded-full ${menuShow ? 'border-black-base' : 'border-white'}`}
                    onClick={() => setMenuShow(!menuShow)}>
                    <img src={backendURL + user.avatar_pic} alt='profile_avatar' className="w-6 h-6 rounded-full" />
                </button>

                <div className={`inset-0 fixed w-full h-full z-10 ${!menuShow && "hidden"}`} onClick={() => setMenuShow(false)}></div>

                <div className={`profile-actions absolute -right-3 bg-white mt-2 z-20 rounded-lg text-sm ${!menuShow && "hidden"}`}>
                    <Link to={`/profile/${user.username}`}>
                        <div className="flex items-center rounded-t-lg p-2 w-56 hover:bg-gray-background">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <p className="">Profile</p>
                        </div>
                    </Link>
                    <p
                        className="p-2 w-56 hover:bg-gray-background rounded-b-lg border-t border-gray-primary cursor-pointer"
                        onClick={logOutOnClick}
                    >
                        Log Out
                    </p>
                </div>
            </div>
        ) : (
            <Skeleton circle={true} height={24} width={24} />
        )
    )
}

export default ProfileMenuActions
