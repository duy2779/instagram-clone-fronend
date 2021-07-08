import { useState } from "react"

import Notifications from "./Notifications"

const NotificationButton = () => {
    const [dropDownShow, setDropDownShow] = useState(false)

    return (
        <div className="relative">
            <button className="focus:outline-none active:opacity-50 mt-1" onClick={() => setDropDownShow(!dropDownShow)}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill={dropDownShow ? 'currentColor' : 'none'} viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
            </button>

            <div className={`inset-0 fixed w-full h-full z-10 ${!dropDownShow && "hidden"}`} onClick={() => setDropDownShow(false)}></div>
            {
                dropDownShow && <Notifications />
            }    
        </div>
    )
}

export default NotificationButton
