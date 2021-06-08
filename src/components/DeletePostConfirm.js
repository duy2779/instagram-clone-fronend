import ModalPrioritize from '../common/ModalPrioritize'
import { useSelector, useDispatch } from 'react-redux'
import { hideDeletePostConfirm, deletePost } from '../features/postsProfileSlice'

const DeletePostConfirm = () => {
    const dispatch = useDispatch()
    const { deletePostConfirm } = useSelector(state => state.postsProfile)

    const deleteOnClick = async () => {
        await dispatch(deletePost({ postID: deletePostConfirm.postID }))
        dispatch(hideDeletePostConfirm())
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
