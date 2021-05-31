import Modal from '../common/Modal'
import { useDispatch, useSelector } from 'react-redux'
import { hideUnFollowUserModal, userSelector, unfollowModalTrue } from '../features/userSlice'
import { backendURL } from '../constants/BackendConfig'
import { followUser } from '../features/userSlice'

const UserModal = () => {
    const dispatch = useDispatch()

    const { unFollowUserModal } = useSelector(userSelector)
    const { username, avatar } = unFollowUserModal

    const unFollowOnClick = async () => {
        await dispatch(followUser(username))
        dispatch(unfollowModalTrue())
        dispatch(hideUnFollowUserModal())
    }

    return (
        <Modal show={unFollowUserModal.show} hide={hideUnFollowUserModal}>
            <div className="relative bg-white rounded-2xl mb-20 text-sm">
                <div className="flex flex-col justify-center items-center px-36 pt-10 pb-6 border-b">
                    <img src={backendURL + avatar} alt="instagram" className="w-24 h-24 rounded-full mb-5" />
                    <p>Unfollow @{username}?</p>
                </div>
                <div className="border-b">
                    <button onClick={() => unFollowOnClick()}
                        className="w-full py-3 focus:outline-none text-red-500 font-bold">
                        Unfollow
                    </button>
                </div>
                <div>
                    <button onClick={() => dispatch(hideUnFollowUserModal())}
                        className="w-full py-3 focus:outline-none">
                        Cancel
                    </button>
                </div>
            </div>
        </Modal>
    )
}

export default UserModal
