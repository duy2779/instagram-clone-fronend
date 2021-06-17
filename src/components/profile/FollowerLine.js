import { Link } from 'react-router-dom'
import { backendURL } from '../../constants/BackendConfig'

const FollowerLine = ({ user }) => {
    return (
        <div className="flex items-center mb-4">
            <Link to={`/profile/${user.username}`}>
                <img src={backendURL + user.avatar_pic} alt={user.username} className="rounded-full w-10 object-cover mr-2" />
            </Link>
            <div className="text-sm">
                <Link to={`/profile/${user.username}`}>
                    <p className="cursor-pointer font-semibold">{user.username}</p>
                </Link>
                <p className="text-gray-secondary">{user.full_name}</p>
            </div>
        </div>
    )
}

export default FollowerLine
