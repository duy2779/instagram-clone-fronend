import { useState } from 'react'
import Modal from '../../common/Modal'
import { showPostModal, hidePostModal } from '../../features/postsProfileSlice'
import { useSelector, useDispatch } from 'react-redux'
import { backendURL } from '../../constants/BackendConfig'

function PostModal() {
    const dispatch = useDispatch()
    const { currentUser } = useSelector(state => state.user)
    const { postModal } = useSelector(state => state.postsProfile)
    const { post } = postModal

    return (
        <Modal show={postModal.show} hide={hidePostModal}>
            <div className="max-w-screen-lg mx-auto flex">
                <img src={backendURL + post.image} alt={post.caption} className="max-w-lg" />
            </div>
        </Modal>
    )
}

export default PostModal
