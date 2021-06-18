import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { backendURL } from '../../constants/BackendConfig'
import { useSelector, useDispatch } from 'react-redux'
import {
    followUser,
    getUser,
    getUserByUserName,
} from '../../features/userSlice'
import ToggleFollowSM from '../../common/ToggleFollowSM'

const FollowingLine = ({ user }) => {
    const dispatch = useDispatch()
    const { username } = user
    const { currentUser, unFollowUserModal, userFocus } = useSelector(state => state.user)
    const [isFollow, setIsFollow] = useState(() => currentUser.following.includes(user.id))
    const isCurrentUser = currentUser.username === username

    const followOnClick = async () => {
        await dispatch(followUser(user.username))
        await dispatch(getUser())
        await dispatch(getUserByUserName({ username: userFocus.username }))
        setIsFollow(true)
    }

    useEffect(() => {
        if (unFollowUserModal.unfollow && unFollowUserModal.username === username) {
            setIsFollow(false)
        }
        // eslint-disable-next-line
    }, [unFollowUserModal])

    return (
        <>
            <div className="flex items-center mb-4 justify-between">
                <Link to={`/profile/${user.username}`}>
                    <img src={backendURL + user.avatar_pic} alt={user.username} className="rounded-full w-10 object-cover mr-2" />
                </Link>
                <div className="text-sm flex-grow">
                    <div>
                        <Link to={`/profile/${user.username}`}>
                            <span className="cursor-pointer font-semibold">{user.username}</span>
                        </Link>

                    </div>
                    <p className="text-gray-secondary">{user.full_name}</p>
                </div>
                {
                    !isCurrentUser && (
                        <ToggleFollowSM isFollow={isFollow} user={user} followOnClick={followOnClick} />
                    )
                }

            </div>

        </>
    )
}

export default FollowingLine
