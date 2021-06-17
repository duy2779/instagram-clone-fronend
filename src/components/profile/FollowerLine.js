import { Link } from 'react-router-dom'
import { useState } from 'react'
import { backendURL } from '../../constants/BackendConfig'

import RemoveFollowerModal from '../RemoveFollowerModal'

const FollowerLine = ({ user }) => {
    const [removeFollowerModalShow, setRemoveFollowerModalShow] = useState(false)
    const [isRemoved, setIsRemoved] = useState(false)

    return (
        <>
            <div className="flex items-center mb-4 justify-between">
                <Link to={`/profile/${user.username}`}>
                    <img src={backendURL + user.avatar_pic} alt={user.username} className="rounded-full w-10 object-cover mr-2" />
                </Link>
                <div className="text-sm flex-grow">
                    <Link to={`/profile/${user.username}`}>
                        <p className="cursor-pointer font-semibold">{user.username}</p>
                    </Link>
                    <p className="text-gray-secondary">{user.full_name}</p>
                </div>

                <button
                    className={`focus:outline-none rounded text-sm font-semibold border
                    border-gray-primary px-2 py-1 active:opacity-50 ${isRemoved && 'opacity-50'}`}
                    disabled={isRemoved}
                    onClick={() => setRemoveFollowerModalShow(true)}>
                    {
                        isRemoved ? 'Removed' : 'Remove'
                    }
                </button>
            </div>
            {
                removeFollowerModalShow &&
                <RemoveFollowerModal
                    show={removeFollowerModalShow}
                    setShow={setRemoveFollowerModalShow}
                    follower={user}
                    setIsRemoved={setIsRemoved}
                />
            }

        </>
    )
}

export default FollowerLine
