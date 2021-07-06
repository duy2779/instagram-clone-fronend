import { useEffect } from "react"
import Header from "../components/Header"
import Timeline from "../components/timeline"
import Sidebar from "../components/sidebar/Sidebar"
import { useDispatch, useSelector } from 'react-redux'

import { userSelector, clearStatus } from '../features/userSlice'
import { getUserRecommended } from '../features/usersRecommendedSlice'

const DashBoard = () => {
    const dispatch = useDispatch()
    const { isSuccess } = useSelector(userSelector)

    useEffect(() => {
        document.title = "Instagram"
        dispatch(getUserRecommended())
    }, [dispatch])

    useEffect(() => {
        if (isSuccess) {
            dispatch(clearStatus())
        }
    }, [isSuccess, dispatch])

    return (
        <>
            <div className="bg-gray-background">
                <Header />
                <div className="grid lg:grid-cols-3 gap-8 lg:justify-between mx-auto max-w-screen-lg justify-center">
                    <Timeline />
                    <Sidebar />
                </div>
            </div>
        </>
    )
}

export default DashBoard
