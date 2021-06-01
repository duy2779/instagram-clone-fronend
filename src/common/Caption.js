import { Link } from 'react-router-dom'
import { backendURL } from '../constants/BackendConfig'
import { distanceDate } from '../helpers/formatDate'

const Caption = ({ user, caption, created }) => {
    const distanceTime = distanceDate(created)

    return (
        <>
            <div className="flex mb-3">
                <div className="flex items-center">
                    <Link to={`/profile/${user.username}`}>
                        <img
                            src={backendURL + user.avatar_pic}
                            alt={`${user.username}_avatar`}
                            className="w-10 h-10 rounded-full mr-3"
                        />
                    </Link>
                    <Link to={`/profile/${user.username}`}>
                        <span className="col-span-8 text-sm font-semibold">{user.username}</span>
                    </Link>
                    <p className="text-sm ml-3">{caption}</p>
                </div>
            </div>
            <p className="ml-1 text-gray-secondary text-xxs leading-3 mb-5">{distanceTime.toUpperCase()}</p>
        </>
    )
}

export default Caption
