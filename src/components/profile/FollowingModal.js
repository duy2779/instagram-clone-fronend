import Modal from '../../common/Modal'
import PropTypes from 'prop-types'
import { useState, useEffect } from 'react'
import Skeleton from 'react-loading-skeleton';
import { get, getApiURL } from '../../features/config'
import FollowingLine from './FollowingLine'
import { useSelector } from 'react-redux'

const FollowingModal = ({ username, isShow, setIsShow }) => {
    const [isLoading, setIsLoading] = useState(true)
    const [following, setFollowing] = useState([])

    const { currentUser, userFocus } = useSelector(state => state.user)
    const isCurrentUserPage = userFocus.user.username === currentUser.username

    useEffect(() => {
        async function fetchData() {
            try {
                setIsLoading(true)
                const response = await get({
                    url: getApiURL(`accounts/get-following/${username}`)
                })
                if (response.status === 200) {
                    setFollowing(response.data)
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
            <div className="bg-white w-96 h-96 rounded-lg flex flex-col following-modal">
                {/* header */}
                <p className="text-center font-semibold py-2 border-b">Following</p>
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
                            ) : following.map((follower, index) => <FollowingLine
                                key={index} user={follower} isCurrentUserPage={isCurrentUserPage} />)
                        }
                    </div>
                </div>
            </div>
        </Modal>
    )
}

export default FollowingModal

FollowingModal.propTypes = {
    username: PropTypes.string.isRequired,
    isShow: PropTypes.bool.isRequired,
    setIsShow: PropTypes.func.isRequired,
}