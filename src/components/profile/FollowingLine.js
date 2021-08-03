import { Link } from 'react-router-dom'
import { backendURL } from '../../constants/BackendConfig'
import { useSelector, useDispatch } from 'react-redux'
import {
    followUser,
} from '../../features/userSlice'
import ToggleFollowSM from '../../common/ToggleFollowSM'

const FollowingLine = ({ user }) => {
    const dispatch = useDispatch()
    const { username } = user
    const { currentUser } = useSelector(state => state.user)
    const isFollowing = useSelector(state => state.user.currentUser.following.includes(user.id))
    const isCurrentUser = currentUser.username === username

    const followOnClick = () => {
        dispatch(followUser(user.username))
    }


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
                        <ToggleFollowSM isFollowing={isFollowing} user={user} followOnClick={followOnClick} />
                    )
                }

            </div>

        </>
    )
}

export default FollowingLine
