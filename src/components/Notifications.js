import { useState, useEffect } from 'react'

import { get, getApiURL } from '../features/config'
import { backendURL } from '../constants/BackendConfig'
import NotificationToggleFollow from './NotificationToggleFollow'
import { Link } from 'react-router-dom'

const Notifications = () => {
    const [isFetching, setIsFetching] = useState(false)
    const [notifications, setNotifications] = useState(null)

    const delay = () => {
        setTimeout(() => {
            setIsFetching(false)
        }, 1000)
    }

    useEffect(() => {
        async function fetchData() {
            setIsFetching(true)
            try {
                const response = await get({
                    url: getApiURL('notification/get-notifications')
                })
                if (response.status === 200) {
                    delay()
                    setNotifications(response.data)
                }
            } catch (error) {
                delay()
                console.error(error)
            }
        }

        fetchData()
    }, [])

    return (
        <div className={`notifications absolute top-full mt-3 bg-white -right-10 z-30 rounded`}>
            <div className="w-96 max-h-96 overflow-auto">
                {
                    isFetching ? (
                        <div className="flex justify-center h-28 items-center">
                            <img src="/svg/spinner-gray.svg" className="h-12 w-12" alt="spinner" />
                        </div>
                    ) : (
                        notifications ? (
                            notifications.length === 0 ? (
                                <p className="flex justify-center h-28 items-center">No announcements</p>
                            ) : (
                                <ul>
                                    {
                                        notifications.map((notification) => (
                                            <li
                                                key={notification.id}
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
                                                        <NotificationToggleFollow user={notification.created_by} />
                                                    ) : (
                                                        <Link to={`/p/${notification.post.id}`}>
                                                            <img className="w-10 h-10 object-cover" src={backendURL + notification.post.image} alt={notification.post.id} />
                                                        </Link>
                                                    )
                                                }
                                            </li>
                                        ))
                                    }
                                </ul>
                            )
                        ) : (
                            <p className="flex justify-center h-28 items-center">An error occurred, please try again later</p>
                        )
                    )
                }
            </div>
        </div>

    )
}

export default Notifications
