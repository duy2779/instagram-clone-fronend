import Modal from '../../common/Modal'
import PropTypes from 'prop-types'
import { useState, useEffect } from 'react'
import Skeleton from 'react-loading-skeleton';
import { get, getApiURL } from '../../features/config'
import FollowerLine from './FollowerLine'
import { useSelector } from 'react-redux'

const FollowersModal = ({ username, isShow, setIsShow }) => {
    const [isLoading, setIsLoading] = useState(true)
    const [followers, setFollowers] = useState([])

    const { currentUser, userFocus } = useSelector(state => state.user)
    const isCurrentUserPage = userFocus.user.username === currentUser.username

    useEffect(() => {
        async function fetchData() {
            try {
                setIsLoading(true)
                const response = await get({
                    url: getApiURL(`accounts/get-followers/${username}`)
                })
                if (response.status === 200) {
                    setFollowers(response.data)
                    setIsLoading(false)
                }
            } catch (error) {
                console.log(error)
            }

        }
        fetchData()
        // eslint-disable-next-line
    }, [])


    return (
        <Modal show={isShow} hideByState={setIsShow}>
            <div className="bg-white w-96 h-96 rounded-lg flex flex-col followers-modal">
                {/* header */}
                <p className="text-center font-semibold py-2 border-b">Followers</p>
                {/* content */}
                <div className="overflow-y-auto">
                    <div className="px-4 mt-2">
                        {
                            isLoading ? (
                                new Array(5).fill(0).map((_, i) => (
                                    <div key={i} className="flex items-center mb-4">
                                        <Skeleton circle={true} height={50} width={50} />
                                        <div className="ml-2 flex flex-col">
                                            <Skeleton width={150} />
                                            <Skeleton width={100} />
                                        </div>
                                    </div>
                                ))
                            ) : followers.map((follower, index) => <FollowerLine
                                key={index} user={follower} isCurrentUserPage={isCurrentUserPage} />)
                        }
                    </div>
                </div>
            </div>
        </Modal>
    )
}

export default FollowersModal

FollowersModal.propTypes = {
    username: PropTypes.string.isRequired,
    isShow: PropTypes.bool.isRequired,
    setIsShow: PropTypes.func.isRequired,
}