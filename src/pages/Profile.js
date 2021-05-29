import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useHistory } from 'react-router-dom'

import Page from './Page'
import UserProfile from '../components/profile'
import { getUserByUserName, clearUserFocus } from '../features/userSlice'
import { getPostsProfile, clearPostsProfile } from '../features/postsProfileSlice'
import * as ROUTES from '../constants/Routes'

const Profile = ({ props }) => {
    const history = useHistory()
    const dispatch = useDispatch()
    const { userFocus } = useSelector(state => state.user)
    const { posts } = useSelector(state => state.postsProfile)
    const { username } = useParams()
    const [user, setUser] = useState(null)

    useEffect(() => {
        async function fetchData() {
            await dispatch(getUserByUserName({ username }))
            await dispatch(getPostsProfile({ username }))
        }
        fetchData()
        // eslint-disable-next-line
        return function cleanup() {
            dispatch(clearUserFocus())
            dispatch(clearPostsProfile())
        }
    }, [username, dispatch])

    useEffect(() => {
        if (!userFocus) {
            history.push(ROUTES.NOT_FOUND)
            return
        }
        setUser(userFocus)
        // eslint-disable-next-line
    }, [userFocus])

    return user?.username ? (
        <Page>
            <div className="mx-auto max-w-screen-lg">
                <UserProfile user={user} photos={posts} />
            </div>
        </Page>
    ) : null
}

export default Profile
