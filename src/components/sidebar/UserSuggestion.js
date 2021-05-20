import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { backendURL } from '../../constants/BackendConfig'
import Skeleton from 'react-loading-skeleton'
import { useDispatch, useSelector } from 'react-redux'
import { followUser, showUnFollowUserModal } from '../../features/userSlice'

const UserSuggestion = ({ userRecommend }) => {
    const dispatch = useDispatch()
    const { avatar_pic, username, full_name } = userRecommend
    const { currentUser, unFollowUserModal } = useSelector((state) => state.user)

    const [following, setFollowing] = useState(() => userRecommend.followers.includes(currentUser.id));

    const followOnClick = () => {
        dispatch(followUser(username))
        setFollowing(!following)
    }

    useEffect(() => {
        if (unFollowUserModal.unfollow === true && unFollowUserModal.username === username) {
            setFollowing(false)
        }
    }, [unFollowUserModal.username, unFollowUserModal.unfollow, username])

    return (
        <div className="grid grid-cols-7 mb-3 items-center">
            {
                avatar_pic ? (
                    <Link to="/profile" className="col-span-1">
                        <img src={backendURL + avatar_pic} alt="avatar_picture" className="w-9 h-9 rounded-full" />
                    </Link>
                ) : (
                    <Skeleton circle={true} height={60} width={60} className="mr-5" />
                )
            }

            <div className="col-span-4 flex flex-col">
                {
                    username ? (
                        <Link to="/profile">
                            <p className="font-semibold text-sm">{username}</p>
                        </Link>
                    ) : (
                        <Skeleton width={120} />
                    )
                }
                <p className="text-gray-secondary text-xs">{full_name || <Skeleton width={90} />}</p>
            </div>
            {
                following ? (
                    <p className="col-span-2 text-right text-xs font-semibold cursor-pointer"
                        onClick={() => dispatch(showUnFollowUserModal({ username, avatar_pic }))}>Following</p>
                ) : (
                    <p className="col-span-2 text-right text-xs font-semibold text-blue-medium cursor-pointer"
                        onClick={() => followOnClick(username)}>Follow</p>
                )
            }

        </div >
    )
}

export default UserSuggestion
