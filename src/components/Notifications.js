import { useState, useEffect } from 'react'
import { useDispatch } from "react-redux"

import { get, getApiURL, patch } from '../features/config'
import { isThisMinute, isToday, isThisWeek, isThisMonth } from '../helpers/dateHandler'
import Notification from './Notification'
import { getUser } from "../features/userSlice"

const Notifications = ({ hasUnseen, setHasUnseen, setShowCount }) => {
    const dispatch = useDispatch()
    const [isFetching, setIsFetching] = useState(false)
    const [notifications, setNotifications] = useState(null)

    const delay = () => {
        setTimeout(() => {
            setIsFetching(false)
        }, 1000)
    }

    const notificationsFilter = (allNotifications) => {
        const thisMinute = []
        const today = []
        const thisWeek = []
        const thisMonth = []
        const older = []

        for (const item of allNotifications) {
            if (item.seen === false || isThisMinute(item.created)) {
                thisMinute.push(item)
                continue
            }
            if (isToday(item.created)) {
                today.push(item)
                continue
            }
            if (isThisWeek(item.created)) {
                thisWeek.push(item)
                continue
            }
            if (isThisMonth(item.created)) {
                thisMonth.push(item)
                continue
            }

            older.push(item)
        }

        return {
            length: allNotifications.length,
            thisMinute,
            today,
            thisWeek,
            thisMonth,
            older
        }
    }

    const markNotifications = async () => {
        try {
            await patch({
                url: getApiURL("notification/mark-notifications-seen"),
                payload: {}
            })
        } catch (error) {
            console.error(error)
        }
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
                    setNotifications(() => notificationsFilter(response.data))
                }
            } catch (error) {
                delay()
                console.error(error)
            }
        }

        fetchData()

        return () => {
            if (hasUnseen) {
                setHasUnseen(false)
                setShowCount(false)
                markNotifications()
                dispatch(getUser())
            }
        }
        // eslint-disable-next-line
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
                                        notifications.thisMinute.length !== 0 && (
                                            <li className="border-b">
                                                <p className="p-2 text-sm font-semibold">New</p>
                                                <ul>
                                                    {
                                                        notifications.thisMinute.map((notification) => (
                                                            <Notification key={notification.id} notification={notification} />
                                                        ))
                                                    }
                                                </ul>
                                            </li>
                                        )
                                    }
                                    {
                                        notifications.today.length !== 0 && (
                                            <li className="border-b">
                                                <p className="p-2 text-sm font-semibold">Today</p>
                                                <ul>
                                                    {
                                                        notifications.today.map((notification) => (
                                                            <Notification key={notification.id} notification={notification} />
                                                        ))
                                                    }
                                                </ul>
                                            </li>
                                        )
                                    }
                                    {
                                        notifications.thisWeek.length !== 0 && (
                                            <li className="border-b">
                                                <p className="p-2 text-sm font-semibold">This week</p>
                                                <ul>
                                                    {
                                                        notifications.thisWeek.map((notification) => (
                                                            <Notification key={notification.id} notification={notification} />
                                                        ))
                                                    }
                                                </ul>
                                            </li>
                                        )
                                    }
                                    {
                                        notifications.thisMonth.length !== 0 && (
                                            <li className="border-b">
                                                <p className="p-2 text-sm font-semibold">This month</p>
                                                <ul>
                                                    {
                                                        notifications.thisMonth.map((notification) => (
                                                            <Notification key={notification.id} notification={notification} />
                                                        ))
                                                    }
                                                </ul>
                                            </li>
                                        )
                                    }
                                    {
                                        notifications.older.length !== 0 && (
                                            <li className="border-b">
                                                <p className="p-2 text-sm font-semibold">Older</p>
                                                <ul>
                                                    {
                                                        notifications.older.map((notification) => (
                                                            <Notification key={notification.id} notification={notification} />
                                                        ))
                                                    }
                                                </ul>
                                            </li>
                                        )
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
