import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { showUnFollowUserModal, followUser, getUser } from "../features/userSlice"

const NotificationToggleFollow = ({ user }) => {
    const dispatch = useDispatch()
    const { username, avatar_pic } = user
    const {unFollowUserModal, currentUser} = useSelector(state => state.user)
    const [isFollow, setIsFollow] = useState(() => currentUser.following.includes(user.id))

    const followOnClick = async () => {
        await dispatch(followUser(username))
        setIsFollow(true)
        dispatch(getUser())
        
    }

    useEffect(() => {
        if(unFollowUserModal.unfollow === true && unFollowUserModal.username === username){
            setIsFollow(false)
        }
        // eslint-disable-next-line
    }, [unFollowUserModal.unfollow])

    return (
        <>
            {
                isFollow ? (
                    <button
                        className="border border-gray-primary focus:outline-none
                     rounded px-2 h-8 text-sm font-semibold"
                        onClick={() => dispatch(showUnFollowUserModal({ username, avatar_pic }))}>Following</button>
                ) : (
                    <button
                        className="border rounded px-2 h-8 text-sm focus:outline-none
                     font-semibold text-white bg-blue-medium"
                        onClick={followOnClick}>Follow</button>
                )
            }
        </>
    )
}

export default NotificationToggleFollow
