import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { backendURL } from '../../constants/BackendConfig'
import { useSelector, useDispatch } from 'react-redux'
import {
    followUser,
    getUser,
    showUnFollowUserModal,
    getUserByUserName,
} from '../../features/userSlice'
import RemoveFollowerModal from '../RemoveFollowerModal'
import ToggleFollowSM from '../../common/ToggleFollowSM'

const FollowerLine = ({ user, isCurrentUserPage }) => {
    const dispatch = useDispatch()
    const { username, avatar_pic } = user
    const [removeFollowerModalShow, setRemoveFollowerModalShow] = useState(false)
    const [isRemoved, setIsRemoved] = useState(false)
    const { currentUser, unFollowUserModal, userFocus } = useSelector(state => state.user)
    const [isFollow, setIsFollow] = useState(() => currentUser.following.includes(user.id))
    const isCurrentUser = currentUser.username === user.username

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
                        {
                            isCurrentUserPage && (
                                <span className="text-xs font-semibold">
                                    <span className="text-black-base"> · </span>
                                    {
                                        isFollow ? (
                                            <span
                                                className="cursor-pointer"
                                                onClick={() => dispatch(showUnFollowUserModal({ username, avatar_pic }))}>
                                                Unfollow
                                            </span>
                                        ) : (
                                            <span className="cursor-pointer text-blue-medium" onClick={followOnClick}>Follow</span>
                                        )
                                    }

                                </span>
                            )
                        }

                    </div>
                    <p className="text-gray-secondary">{user.full_name}</p>
                </div>

                {
                    isCurrentUserPage ? (
                        <button
                            className={`focus:outline-none rounded text-sm font-semibold border
                        border-gray-primary px-2 py-1 active:opacity-50 ${isRemoved && 'opacity-50'}`}
                            disabled={isRemoved}
                            onClick={() => setRemoveFollowerModalShow(true)}>
                            {
                                isRemoved ? 'Removed' : 'Remove'
                            }
                        </button>
                    ) : !isCurrentUser ? (
                        <ToggleFollowSM isFollow={isFollow} user={user} followOnClick={followOnClick} />
                    ) : null
                }

            </div>
            {
                removeFollowerModalShow &&
                <RemoveFollowerModal
                    show={removeFollowerModalShow}
                    setShow={setRemoveFollowerModalShow}
                    follower={user}
                    setIsRemoved={setIsRemoved}
                />
            }

        </>
    )
}

export default FollowerLine
