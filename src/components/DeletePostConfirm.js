import ModalPrioritize from '../common/ModalPrioritize'
import { useSelector, useDispatch } from 'react-redux'
import { hideDeletePostConfirm, deletePost, hidePostModal, getPostsProfile } from '../features/postsProfileSlice'
import { getUserByUserName } from '../features/userSlice'
import { matchPath } from 'react-router'
import { useLocation } from 'react-router-dom'
import * as ROUTES from '../constants/Routes'

const DeletePostConfirm = () => {
    const location = useLocation()
    const dispatch = useDispatch()
    const { deletePostConfirm } = useSelector(state => state.postsProfile)
    const { userFocus } = useSelector(state => state.user)

    const deleteOnClick = async () => {
        await dispatch(deletePost({ postID: deletePostConfirm.postID }))

        if (!!matchPath(location.pathname, ROUTES.PROFILE)) {
            await dispatch(getUserByUserName({ username: userFocus.username }))
            await dispatch(getPostsProfile({ username: userFocus.username }))
        }
        dispatch(hideDeletePostConfirm())
        dispatch(hidePostModal())
    }

    return (
        <ModalPrioritize show={deletePostConfirm.show} hide={hideDeletePostConfirm}>
            <div className="relative bg-white rounded-2xl">
                <div className="flex flex-col items-center py-5">
                    <p className="text-xl font-semibold mb-2">Delete Post?</p>
                    <p className="text-gray-secondary text-sm">Are you sure you want to delete this post?</p>
                </div>
                <p className="px-48 py-3 border text-red-500 font-semibold cursor-pointer" onClick={deleteOnClick}>Delete</p>
                <p className="px-48 py-3 cursor-pointer" onClick={() => dispatch(hideDeletePostConfirm())}>Cancel</p>
            </div>

        </ModalPrioritize>
    )
}

export default DeletePostConfirm
