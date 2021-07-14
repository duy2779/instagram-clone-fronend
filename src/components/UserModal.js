import ModalPrioritize from '../common/ModalPrioritize'
import { useDispatch, useSelector } from 'react-redux'
import { hideUnFollowUserModal, userSelector, unfollowModalTrue } from '../features/userSlice'
import { backendURL } from '../constants/BackendConfig'
import { followUser, getUser, getUserByUserName } from '../features/userSlice'
import { useLocation } from 'react-router-dom'
import { matchPath } from 'react-router'
import * as ROUTES from '../constants/Routes'

const UserModal = () => {
    const dispatch = useDispatch()
    const location = useLocation()

    const { unFollowUserModal, userFocus } = useSelector(userSelector)
    const { username, avatar } = unFollowUserModal

    const unFollowOnClick = async () => {
        await dispatch(followUser(username))
        await dispatch(getUser())
        dispatch(unfollowModalTrue())
        if (!!matchPath(location.pathname, ROUTES.PROFILE)) {
            await dispatch(getUserByUserName({ username: userFocus.username }))
        }
        dispatch(hideUnFollowUserModal())
    }

    return (
        <ModalPrioritize show={unFollowUserModal.show} hide={hideUnFollowUserModal}>
            <div className="relative bg-white rounded-2xl mb-20 text-sm unfollow-modal">
                <div className="flex flex-col justify-center items-center px-20 md:px-36 pt-10 pb-6 border-b">
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
        </ModalPrioritize>
    )
}

export default UserModal
