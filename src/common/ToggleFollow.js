import { showUnFollowUserModal, followUser } from '../features/userSlice'
import { useDispatch, useSelector } from 'react-redux'

const ToggleFollow = ({ user }) => {
    const dispatch = useDispatch()

    const { username, avatar_pic, id } = user
    const isFollowing = useSelector(state => state.user.currentUser.following.includes(id))
    const { loading } = useSelector(state => state.user.followUserState)

    const followOnClick = () => {
        dispatch(followUser(username))
    }

    return (
        <>
            {
                isFollowing ? (
                    <div className="flex items-center justify-center">
                        <button
                            className={`border border-gray-primary focus:outline-none
                     rounded w-full md:px-8 h-8 text-sm font-semibold ${loading[username] && 'opacity-20'}`}
                            onClick={() => dispatch(showUnFollowUserModal({ username, avatar_pic }))}
                            disabled={loading[username]}
                        >
                            Following
                        </button>
                        {
                            loading[username] && <img src="/svg/spinner-gray.svg" className="absolute h-8 w-8" alt="spinner" />
                        }
                    </div>
                ) : (
                    <div className="flex items-center justify-center">
                        <button
                            className={`border rounded w-full md:px-8 h-8 text-sm focus:outline-none
                            font-semibold text-white bg-blue-medium ${loading[username] && 'opacity-20'}`}
                            onClick={followOnClick}
                            disabled={loading[username]}
                        >
                            Follow
                        </button>
                        {
                            loading[username] && <img src="/svg/spinner-gray.svg" className="absolute h-8 w-8" alt="spinner" />
                        }
                    </div>
                )
            }
        </>
    )
}

export default ToggleFollow
