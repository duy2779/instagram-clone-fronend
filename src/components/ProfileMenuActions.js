import { backendURL } from '../constants/BackendConfig'
import Skeleton from 'react-loading-skeleton'
import { useState } from 'react'
import { Link } from 'react-router-dom'

const ProfileMenuActions = ({ user, logOutOnClick }) => {
    const [menuShow, setMenuShow] = useState(false)

    return (
        user.avatar_pic ? (
            <div className="relative">
                <button className="relative mt-1" onClick={() => setMenuShow(!menuShow)}>
                    <img src={backendURL + user.avatar_pic} alt='profile_avatar' className="w-6 h-6 rounded-full" />
                </button>

                <div className={`inset-0 fixed w-full h-full z-10 ${!menuShow && "hidden"}`} onClick={() => setMenuShow(false)}></div>

                <div className={`absolute right-0 bg-white mt-2 shadow-xl z-20 rounded-lg ${!menuShow && "hidden"}`}>
                    <Link to={`/profile/${user.username}`}>
                        <p className="p-2 w-56 hover:bg-gray-background rounded-t-lg">Profile</p>
                    </Link>
                    <p
                        className="p-2 w-56 hover:bg-gray-background rounded-b-lg border-t border-gray-primary cursor-pointer"
                        onClick={logOutOnClick}
                    >
                        Logout
                    </p>
                </div>
            </div>
        ) : (
            <Skeleton circle={true} height={24} width={24} />
        )
    )
}

export default ProfileMenuActions
