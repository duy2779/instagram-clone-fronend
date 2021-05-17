import { useEffect } from "react"
import Header from "../components/Header"
import Timeline from "../components/Timeline"
import Sidebar from "../components/Sidebar"

const DashBoard = () => {

    useEffect(() => {
        document.title = "Instagram"
    }, [])

    return (
        <div className="bg-gray-background">
            <Header />
            <div className="grid">
                <Timeline />
                <Sidebar />
            </div>
        </div>
    )
}

export default DashBoard
