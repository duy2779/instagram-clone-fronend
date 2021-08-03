import { Link } from 'react-router-dom';
import { backendURL } from '../../constants/BackendConfig'
import { useDispatch, useSelector } from 'react-redux'
import { followUser, showUnFollowUserModal } from '../../features/userSlice'

const UserSuggestion = ({ userRecommend }) => {
    const dispatch = useDispatch()
    const { avatar_pic, username, full_name } = userRecommend
    const { followUserState } = useSelector((state) => state.user)
    const isFollowing = useSelector(state => state.user.currentUser.following.includes(userRecommend.id))

    const followOnClick = async () => {
        await dispatch(followUser(username))
    }

    return (
        <div className="grid grid-cols-7 mb-3 items-center">


            <Link to={`/profile/${username}`} className="col-span-1">
                <img src={backendURL + avatar_pic} alt="avatar_picture" className="w-9 h-9 rounded-full" />
            </Link>


            <div className="col-span-4 flex flex-col">


                <Link to={`/profile/${username}`}>
                    <p className="font-semibold text-sm">{username}</p>
                </Link>


                <p className="text-gray-secondary text-xs">{full_name}</p>
            </div>
            {
                followUserState.loading[username] ? (
                    <div className="col-span-2">
                        <img src="/svg/spinner-gray.svg" className="h-9 w-9 ml-auto" alt="spinner" />
                    </div>
                ) : (
                    isFollowing ? (
                        <p className="col-span-2 text-right text-xs font-semibold cursor-pointer"
                            onClick={() => dispatch(showUnFollowUserModal({ username, avatar_pic }))}>Following</p>
                    ) : (
                        <p className="col-span-2 text-right text-xs font-semibold text-blue-medium cursor-pointer"
                            onClick={() => followOnClick(username)}>Follow</p>
                    )
                )

            }

        </div >
    )
}

export default UserSuggestion
