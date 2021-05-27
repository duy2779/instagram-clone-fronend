import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import PropTypes from 'prop-types'
import { backendURL } from '../../constants/BackendConfig'

const Header = ({ user }) => {
    const { currentUser } = useSelector(state => state.user)
    const [followers, setFollowers] = useState(user.followers.length)
    const [isFollow, setIsFollow] = useState(() => user.followers.includes(currentUser.id))

    return (
        <div className="mx-auto max-w-screen-lg grid grid-cols-3">
            <div className="col-span-1 flex justify-center">
                <img src={backendURL + user.avatar_pic} alt={user.username} className="w-36 h-36 rounded-full" />
            </div>
            <div className="col-span-2">
                <div className="mb-5 flex">
                    <p className="text-3xl font-light mr-5">{user.username}</p>
                    {
                        isFollow ? (
                            <button className="border border-gray-primary focus:outline-none rounded px-8 h-8 text-sm font-semibold">Unfollow</button>
                        ) : (
                            <button className="border rounded px-8 h-8 text-sm focus:outline-none font-semibold text-white bg-blue-medium">Follow</button>
                        )
                    }

                </div>
                <div className="flex mb-5">
                    <p className="mr-5">
                        <span className="font-semibold">
                            {`${user.posts_count} `}
                        </span>
                        {
                            user.posts_count > 1 ? 'posts' : 'post'
                        }
                    </p>
                    <p className="mr-5">
                        <span className="font-semibold">
                            {`${followers} `}
                        </span>
                            followers
                    </p>
                    <p className="mr-5">
                        <span className="font-semibold">
                            {`${user.following.length} `}
                        </span>
                            following
                    </p>
                </div>
                <div className="mb-5 font-semibold">{user.full_name}</div>
            </div>
        </div>
    )
}

export default Header

Header.propTypes = {
    user: PropTypes.object
}