import { useEffect } from "react"
import Timeline from "../components/timeline"
import Sidebar from "../components/sidebar/Sidebar"
import { useDispatch, useSelector } from 'react-redux'
import Page from "./Page"
import LoadingPage from '../components/LoadingPage'

import { userSelector, clearStatus } from '../features/userSlice'
import { getUserRecommended } from '../features/usersRecommendedSlice'

const DashBoard = () => {
    const dispatch = useDispatch()
    const { isSuccess, currentUser } = useSelector(userSelector)

    useEffect(() => {
        document.title = "Instagram"
        dispatch(getUserRecommended())
        // eslint-disable-next-line
    }, [])

    useEffect(() => {
        if (isSuccess) {
            dispatch(clearStatus())
        }
    }, [isSuccess, dispatch])

    return currentUser.username ? (
        <Page>
            <div className="bg-gray-background">
                <div className="grid lg:grid-cols-3 gap-8 lg:justify-between mx-auto max-w-screen-lg justify-center">
                    <Timeline />
                    <Sidebar />
                </div>
            </div>
        </Page>
    ) : <LoadingPage />
}

export default DashBoard
