import { backendURL } from '../constants/BackendConfig'
import ToggleFollowSM from '../common/ToggleFollowSM'
import { Link } from 'react-router-dom'

const Notification = ({ notification }) => {
    return (
        <li
            className="p-2 flex items-center justify-between gap-x-2 mb-2"
        >
            <Link to={`/profile/${notification.created_by.username}`}>
                <img
                    src={backendURL + notification.created_by.avatar_pic}
                    alt={notification.created_by.username}
                    className="w-12 h-12 rounded-full oject-cover"
                />
            </Link>
            <p className="text-sm flex-grow">
                <Link to={`/profile/${notification.created_by.username}`}>
                    <span className="font-semibold">{notification.created_by.username}</span>
                </Link>
                <span>
                    {
                        notification.notification_type === 'like' && ' liked your photo.'
                    }
                    {
                        notification.notification_type === 'comment' && ` added a comment.`
                    }
                    {
                        notification.notification_type === 'follow' && ` started following you.`
                    }
                </span>

            </p>
            {
                notification.post === null ? (
                    <ToggleFollowSM user={notification.created_by} />
                ) : (
                    <Link to={`/p/${notification.post.id}`}>
                        <img
                            className="w-10 h-10 object-cover"
                            src={backendURL + notification.post.image}
                            alt={notification.post.id}
                        />
                    </Link>
                )
            }
        </li>
    )
}

export default Notification
