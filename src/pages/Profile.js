import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useHistory } from 'react-router-dom'

import Page from './Page'
import UserProfile from '../components/profile'
import { getUserByUserName, clearUserFocus } from '../features/userSlice'
import { getPostsProfile, clearPostsProfile } from '../features/postsProfileSlice'
import * as ROUTES from '../constants/Routes'
import LoadingPage from '../components/LoadingPage'

const Profile = ({ props }) => {
    const history = useHistory()
    const dispatch = useDispatch()
    const { userFocus, currentUser } = useSelector(state => state.user)
    const { posts } = useSelector(state => state.postsProfile)
    const { username } = useParams()
    const [allPosts, setAllPosts] = useState(posts)

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
        if (userFocus.isError) {
            history.push(ROUTES.NOT_FOUND)
        }
    }, [userFocus.isError, history])

    useEffect(() => {
        setAllPosts(posts)
    }, [posts])

    return userFocus.user && currentUser.username ? (
        <Page>
            <div className="mx-auto max-w-screen-lg">
                <UserProfile user={userFocus.user} photos={allPosts} />
            </div>
        </Page>
    ) : <LoadingPage />
}

export default Profile
