import { showUnFollowUserModal } from '../features/userSlice'
import { useDispatch } from 'react-redux'

const ToggleFollowSM = ({ isFollow, followOnClick, user }) => {
    const dispatch = useDispatch()
    const { username, avatar_pic } = user
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

export default ToggleFollowSM
