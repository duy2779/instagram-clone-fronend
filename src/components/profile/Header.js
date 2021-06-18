import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import PropTypes from 'prop-types'
import { backendURL } from '../../constants/BackendConfig'
import ToggleFollow from '../../common/ToggleFollow'
import { followUser, getUser } from '../../features/userSlice'
import { Link } from 'react-router-dom'
import * as ROUTES from '../../constants/Routes'
import FollowersModal from './FollowersModal'
import FollowingModal from './FollowingModal'

const Header = ({ user }) => {
    const dispatch = useDispatch()
    const [isCurrentUser, setIsCurrentUser] = useState(false)
    const { currentUser, unFollowUserModal } = useSelector(state => state.user)
    const [followers, setFollowers] = useState(user.followers.length)
    const [isFollow, setIsFollow] = useState(() => user.followers.includes(currentUser.id))

    const [isFollowersModalShow, setIsFollowersModalShow] = useState(false)
    const [isFollowingModalShow, setIsFollowingModalShow] = useState(false)

    useEffect(() => {
        if (user.username === currentUser.username) {
            setIsCurrentUser(true)
        }
        // eslint-disable-next-line
    }, [user.username])

    useEffect(() => {
        if (unFollowUserModal.unfollow === true && unFollowUserModal.username === user.username) {
            setIsFollow(false)
            setFollowers(followers - 1)
        }
        // eslint-disable-next-line
    }, [unFollowUserModal.username, unFollowUserModal.unfollow, user.username])

    useEffect(() => {
        setFollowers(user.followers.length)
    }, [user])

    const followOnClick = async () => {
        await dispatch(followUser(user.username))
        await dispatch(getUser())
        setIsFollow(!isFollow)
        setFollowers(followers + 1)
    }

    const followersOnclick = () => {
        if (followers > 0) {
            setIsFollowersModalShow(true)
        }
    }

    const followingOnClick = () => {
        if (user.following.length > 0) {
            setIsFollowingModalShow(true)
        }
    }

    return (
        <div className="mx-auto max-w-screen-lg grid grid-cols-3">
            <div className="col-span-1 flex justify-center">
                <img src={backendURL + user.avatar_pic} alt={user.username} className="w-36 h-36 rounded-full" />
            </div>
            <div className="col-span-2">
                <div className="mb-5 flex">
                    <p className="text-3xl font-light mr-5">{user.username}</p>
                    {
                        isCurrentUser ? (
                            <Link to={ROUTES.PROFILE_EDIT}>
                                <button className="border border-gray-primary focus:outline-none rounded px-8 h-8 text-sm font-semibold">
                                    Edit Profile
                                </button>
                            </Link>

                        ) : <ToggleFollow isFollow={isFollow} followOnClick={followOnClick} user={user} />
                    }

                </div>
                <div className="flex mb-5">
                    <p className="mr-5">
                        <span className="font-semibold">
                            {`${user.posts_count} `}
                        </span>
                        {
                            user.posts_count > 1 ? 'posts' : 'post'
                        }
                    </p>
                    <p className={`mr-5 ${followers > 0 && 'cursor-pointer active:opacity-50'}`} onClick={followersOnclick}>
                        <span className="font-semibold">
                            {`${followers} `}
                        </span>
                        followers
                    </p>
                    <p className={`mr-5 ${user.following.length > 0 && 'cursor-pointer active:opacity-50'}`} onClick={followingOnClick}>
                        <span className="font-semibold">
                            {`${user.following.length} `}
                        </span>
                        following
                    </p>
                </div>
                <div className="mb-5 font-semibold">{user.full_name}</div>
            </div>
            {
                isFollowersModalShow &&
                <FollowersModal
                    username={user.username}
                    isShow={isFollowersModalShow}
                    setIsShow={setIsFollowersModalShow}
                />
            }
            {
                isFollowingModalShow &&
                <FollowingModal
                    username={user.username}
                    isShow={isFollowingModalShow}
                    setIsShow={setIsFollowingModalShow}
                />
            }

        </div>
    )
}

export default Header

Header.propTypes = {
    user: PropTypes.object
}