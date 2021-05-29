import { useEffect } from 'react'
import UserSuggestion from './UserSuggestion'
import { useSelector, useDispatch } from 'react-redux'
import { resetState } from '../../features/usersRecommendedSlice'

const Suggestions = () => {

    const { usersRecommended } = useSelector(state => state.usersRecommended)
    const dispatch = useDispatch()

    useEffect(() => {
        return () => dispatch(resetState())
    }, [dispatch])

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
