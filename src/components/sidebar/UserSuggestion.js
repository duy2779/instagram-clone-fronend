import { Link } from 'react-router-dom';
import { backendURL } from '../../constants/BackendConfig'
import Skeleton from 'react-loading-skeleton'

const UserSuggestion = ({ avatar, username, fullname }) => {

    const followOnClick = (username) => {
        console.log('follow ' + username)
    }

    return (
        <div className="grid grid-cols-7 mb-3 items-center">
            {
                avatar ? (
                    <Link to="/profile">
                        <img src={backendURL + avatar} alt="avatar_picture" className="w-9 h-9 rounded-full" />
                    </Link>
                ) : (
                    <Skeleton circle={true} height={60} width={60} className="mr-5" />
                )
            }

            <div className="col-span-5 flex flex-col">
                {
                    username ? (
                        <Link to="/profile">
                            <p className="font-semibold text-sm">{username}</p>
                        </Link>
                    ) : (
                        <Skeleton width={120} />
                    )
                }
                <p className="text-gray-secondary text-xs">{fullname || <Skeleton width={90} />}</p>
            </div>
            <p className="text-sm font-semibold  text-blue-medium cursor-pointer" onClick={() => followOnClick(username)}>Follow</p>
        </div >
    )
}

export default UserSuggestion
