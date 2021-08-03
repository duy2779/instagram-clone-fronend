import { useEffect } from 'react'
import UserSuggestion from './UserSuggestion'
import { useSelector, useDispatch } from 'react-redux'
import { resetState } from '../../features/usersRecommendedSlice'
import Skeleton from 'react-loading-skeleton'

const Suggestions = () => {

    const { usersRecommended, isFetching } = useSelector(state => state.usersRecommended)
    const dispatch = useDispatch()

    useEffect(() => {
        return () => dispatch(resetState())
    }, [dispatch])

    return (
        <div>
            <p className="text-gray-secondary font-semibold mb-3">Suggestions For You</p>
            {
                isFetching ?
                    new Array(5).fill(0).map((_, i) => (
                        <div className="flex items-center mb-2" key={i}>
                            <Skeleton circle={true} height={50} width={50} className="mr-5" />
                            <div className="flex flex-col">
                                <Skeleton width={120} />

                                <Skeleton width={90} />
                            </div>
                        </div >
                    )) :
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
