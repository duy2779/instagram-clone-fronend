import User from './User'
import Suggestions from './Suggestions'
import { useSelector } from 'react-redux'
import { userSelector } from '../../features/userSlice'

const Sidebar = () => {
    const { currentUser } = useSelector(userSelector)

    return (
        <div>
            <User
                username={currentUser.username}
                fullname={currentUser.full_name}
                avatar={currentUser.avatar_pic}
            />
            <Suggestions />
        </div>
    )
}

export default Sidebar
