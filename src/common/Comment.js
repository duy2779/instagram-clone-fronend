import { getUserByUsername } from '../features/userSlice'
import { backendURL } from '../constants/BackendConfig'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { get, getApiURL } from '../features/config'

const Comment = ({ username, comment }) => {
    const [user, setUser] = useState(null)

    console.log(username)

    async function getUser() {
        const response = await get({
            url: getApiURL(`accounts/user/${username}`)
        })
        if (response.status === 200) {
            setUser(response.data)
        }
    }

    useEffect(() => {
        getUser()
    }, [])

    return user ? (
        <div className="flex mb-5">
            <div className="flex items-center">
                <Link to={`/profile/${user.username}`}>
                    <img
                        src={backendURL + user.avatar_pic}
                        alt={`${user.username}_avatar`}
                        className="w-10 h-10 rounded-full mr-3"
                    />
                </Link>
                <Link to={`/profile/${user.username}`}>
                    <span className="col-span-8 text-sm font-semibold">{user.username}</span>
                </Link>
                <p className="text-sm ml-3">{comment}</p>
            </div>
        </div>
    ) : null
}

export default Comment
