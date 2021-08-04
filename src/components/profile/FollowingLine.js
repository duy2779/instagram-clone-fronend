import { Link } from 'react-router-dom'
import { backendURL } from '../../constants/BackendConfig'
import { useSelector } from 'react-redux'

import ToggleFollowSM from '../../common/ToggleFollowSM'

const FollowingLine = ({ user }) => {
    const { username } = user
    const { currentUser } = useSelector(state => state.user)
    const isCurrentUser = currentUser.username === username

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
                        <ToggleFollowSM user={user} />
                    )
                }

            </div>

        </>
    )
}

export default FollowingLine
