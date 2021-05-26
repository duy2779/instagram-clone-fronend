import { useState } from 'react'
import Modal from '../common/Modal'
import { hideCreatePostModal } from '../features/postSlice'
import { useSelector, useDispatch } from 'react-redux'
import { backendURL } from '../constants/BackendConfig'
import { createPost } from '../features/postSlice'

function CreatePostModal() {
    const dispatch = useDispatch()
    const [caption, setCaption] = useState('')
    const { createPostModal } = useSelector(state => state.post)
    const { currentUser } = useSelector(state => state.user)


    const handleCreatePost = async () => {
        await dispatch(createPost({ caption, image: createPostModal.image }))
        dispatch(hideCreatePostModal())
    }

    return (
        <Modal show={createPostModal.show}>
            <div className="container max-w-screen-lg mx-auto flex">
                <img src={createPostModal.imagePreview} alt="abc" className="max-w-lg" />
                <div className="bg-white px-3 py-4 flex flex-col justify-between">
                    <div>
                        {/* cancel button */}
                        <div className="flex flex-row-reverse">
                            <button onClick={() => dispatch(hideCreatePostModal())}>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        <div className="flex items-center">
                            <img src={backendURL + currentUser.avatar_pic} alt={currentUser.username} className="w-10 h-10 rounded-full mr-2" />
                            <span className="font-semibold text-sm">{currentUser.username}</span>
                        </div>
                        <div className="mt-2">
                            <input onChange={({ target }) => setCaption(target.value)} type="text" className="w-80 focus:outline-none" placeholder="Type your caption here..." />
                        </div>
                    </div>

                    <button onClick={handleCreatePost} className="w-full h-8 rounded bg-blue-medium font-semibold text-sm focus:outline-none text-white">
                        Post
                    </button>
                </div>
            </div>
        </Modal>
    )
}

export default CreatePostModal
