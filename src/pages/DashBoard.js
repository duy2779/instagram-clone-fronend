import { useEffect } from "react"
import Header from "../components/Header"
import Timeline from "../components/Timeline"
import Sidebar from "../components/sidebar/Sidebar"
import { useDispatch, useSelector } from 'react-redux'

import { userSelector, getUser, getUserRecommended, clearStatus } from '../features/userSlice'

const DashBoard = () => {
    const dispatch = useDispatch()
    const { isSuccess, currentUser } = useSelector(userSelector)

    useEffect(() => {
        document.title = "Instagram"
        dispatch(getUser())
        dispatch(getUserRecommended())
    }, [dispatch])

    useEffect(() => {
        if (isSuccess) {
            dispatch(clearStatus())
        }
    }, [isSuccess, dispatch])

    return (
        <div className="bg-gray-background">
            <Header userAvatar={currentUser.avatar_pic} />
            <div className="grid grid-cols-3 gap-8 justify-between mx-auto max-w-screen-lg">
                <Timeline />
                <Sidebar />
            </div>
        </div>
    )
}

export default DashBoard
