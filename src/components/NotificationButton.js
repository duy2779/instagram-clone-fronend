import { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"

import { getUser } from "../features/userSlice"

import Notifications from "./Notifications"

const NotificationButton = () => {
    const dispatch = useDispatch()
    const [dropDownShow, setDropDownShow] = useState(false)
    const { unseen_notifications_count } = useSelector(state => state.user.currentUser)
    const [hasUnseen, setHasUnseen] = useState(!!unseen_notifications_count)
    const [showCount, setShowCount] = useState(!!unseen_notifications_count)

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowCount(false)
        }, 5000)
        return () => clearTimeout(timer)
    }, [])

    const notificationOnClick = () => {
        if(hasUnseen){
            setHasUnseen(false)
            setShowCount(false)
            dispatch(getUser())
        }
        setDropDownShow(!dropDownShow)
    }

    return (
        <div className="relative flex justify-center">
            <button className="focus:outline-none active:opacity-50" onClick={notificationOnClick}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill={dropDownShow ? 'currentColor' : 'none'} viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
            </button>

            <div className={`inset-0 fixed w-full h-full z-10 ${!dropDownShow && "hidden"}`} onClick={() => setDropDownShow(false)}></div>
            {
                dropDownShow && <Notifications />
            }
            {
                hasUnseen && (
                    <div className="absolute h-1 w-1 bg-red-primary rounded-full -bottom-2 inset-x-0 mx-auto"></div>

                )
            }
            {
                showCount && (
                    <div className="notifications-count absolute -bottom-16 flex items-center gap-x-1 bg-red-primary p-2 rounded-lg">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 fill-white text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                        <span className="text-white">{unseen_notifications_count}</span>
                    </div>
                )
            }

        </div>
    )
}

export default NotificationButton
