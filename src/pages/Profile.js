import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useHistory } from 'react-router-dom'

import Page from './Page'
import UserProfile from '../components/profile'
import { getUserByUserName, clearUserFocus } from '../features/userSlice'
import * as ROUTES from '../constants/Routes'

const Profile = ({ props }) => {
    const history = useHistory()
    const dispatch = useDispatch()
    const { userFocus } = useSelector(state => state.user)
    const { username } = useParams()
    const [user, setUser] = useState(null)

    useEffect(() => {
        dispatch(getUserByUserName({ username }))
        // eslint-disable-next-line
        return function cleanup() {
            dispatch(clearUserFocus())
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
                <UserProfile user={user} />
            </div>
        </Page>
    ) : null
}

export default Profile
