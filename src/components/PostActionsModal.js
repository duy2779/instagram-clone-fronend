import { useSelector, useDispatch } from 'react-redux'

import ModalPrioritize from '../common/ModalPrioritize'
import { hidePostActionsModal, showDeletePostConfirm } from '../features/postsProfileSlice'
import { showUnFollowUserModal } from '../features/userSlice'

const PostActionsModal = () => {
    const dispatch = useDispatch()
    const { postActionsModal } = useSelector(state => state.postsProfile)
    const { currentUser } = useSelector(state => state.user)
    const { post } = postActionsModal
    const isPostByCurrentUser = () => post.user.id === currentUser.id
    const isPostByFollowingUser = () => currentUser.following.includes(post.user.id)

    const unFollowOnClick = () => {
        dispatch(hidePostActionsModal())
        dispatch(showUnFollowUserModal({ username: post.user.username, avatar_pic: post.user.avatar_pic }))
    }

    const deleteOnClick = () => {
        dispatch(hidePostActionsModal())
        dispatch(showDeletePostConfirm({ postID: post.id }))
    }

    return postActionsModal.show ? (
        <ModalPrioritize show={postActionsModal.show} hide={hidePostActionsModal}>
            <div className="relative bg-white rounded-2xl">
                {
                    isPostByCurrentUser() ? (
                        <p
                            className="px-20 md:px-56 py-3 border-b text-red-500 font-semibold cursor-pointer"
                            onClick={deleteOnClick}>
                            Delete
                        </p>
                    ) : isPostByFollowingUser() ? (
                        <p
                            className="px-20 md:px-56 py-3 border-b text-red-500 font-semibold cursor-pointer"
                            onClick={unFollowOnClick}>
                            Unfollow
                        </p>
                    ) : (
                        <p className="px-20 md:px-56 py-3 border-b text-red-500 font-semibold cursor-pointer">Report</p>
                    )
                }
                <p className="px-20 md:px-56 py-3 cursor-pointer" onClick={() => dispatch(hidePostActionsModal())}>Cancel</p>
            </div>
        </ModalPrioritize>
    ) : null
}

export default PostActionsModal
