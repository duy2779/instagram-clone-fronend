import UserSuggestion from './UserSuggestion'
import { userSelector } from '../../features/userSlice'
import { useSelector } from 'react-redux'

const Suggestions = () => {

    const { usersRecommended } = useSelector(userSelector)

    return (
        <div>
            <p className="text-gray-secondary font-semibold mb-3">Suggestions For You</p>
            {
                usersRecommended.map(user => {
                    return <UserSuggestion
                        key={user.id}
                        userRecommend={user} />
                })
            }
        </div>
    )
}

export default Suggestions
