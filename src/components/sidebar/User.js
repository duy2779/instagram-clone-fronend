import React from 'react'
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { backendURL } from '../../constants/BackendConfig'
import Skeleton from 'react-loading-skeleton'

const User = ({ username, fullname, avatar }) => {
    return (
        <div className="flex mb-5 items-center">
            {
                avatar ? (
                    <Link to={`/profile/${username}`}>
                        <img src={backendURL + avatar} alt="avatar_picture" className="w-16 h-16 rounded-full mr-5" />
                    </Link>
                ) : (
                    <Skeleton circle={true} height={60} width={60} className="mr-5" />
                )
            }

            <div className="flex flex-col">
                {
                    username ? (
                        <Link to={`/profile/${username}`}>
                            <p className="font-semibold">{username}</p>
                        </Link>
                    ) : (
                        <Skeleton width={100} />
                    )
                }
                <p className="text-gray-secondary text-sm">{fullname || <Skeleton />}</p>
            </div>

        </div >
    )
}

User.propTypes = {
    username: PropTypes.string,
    fullname: PropTypes.string,
    avatar: PropTypes.string,
}

export default React.memo(User)
