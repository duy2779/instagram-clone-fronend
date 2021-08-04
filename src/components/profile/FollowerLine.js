import { Link } from 'react-router-dom'
import { useState } from 'react'
import { backendURL } from '../../constants/BackendConfig'
import { useSelector, useDispatch } from 'react-redux'
import {
    followUser,
    showUnFollowUserModal,
} from '../../features/userSlice'
import RemoveFollowerModal from '../RemoveFollowerModal'
import ToggleFollowSM from '../../common/ToggleFollowSM'

const FollowerLine = ({ user, isCurrentUserPage }) => {
    const dispatch = useDispatch()
    const { username, avatar_pic } = user
    const [removeFollowerModalShow, setRemoveFollowerModalShow] = useState(false)
    const [isRemoved, setIsRemoved] = useState(false)
    const [removeLoading, setRemoveLoading] = useState(false)
    const { currentUser, followUserState } = useSelector(state => state.user)
    const isFollowing = useSelector(state => state.user.currentUser.following.includes(user.id))
    const isCurrentUser = currentUser.username === user.username

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
                        {
                            isCurrentUserPage && (
                                <span className="text-xs font-semibold">
                                    <span className="text-black-base"> · </span>
                                    {
                                        followUserState.loading[username] ? (
                                            <img src="/svg/spinner-gray.svg" className="h-5 inline-block absolute" alt="spinner" />
                                        ) :
                                            isFollowing ? (
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
                            className={`relative flex items-center justify-center focus:outline-none rounded text-sm font-semibold border
                        border-gray-primary px-2 py-1 active:opacity-50 ${removeLoading && 'text-white'} ${isRemoved && 'opacity-50'}`}
                            disabled={isRemoved}
                            onClick={() => setRemoveFollowerModalShow(true)}>
                            {
                                isRemoved ? 'Removed' : 'Remove'
                            }
                            {
                                removeLoading && (
                                    <img src="/svg/spinner-gray.svg" className="w-8 absolute" alt="spinner" />
                                )
                            }
                        </button>
                    ) : !isCurrentUser ? (
                        <ToggleFollowSM user={user} />
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
                    setRemoveLoading={setRemoveLoading}
                />
            }

        </>
    )
}

export default FollowerLine
