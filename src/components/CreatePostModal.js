import { useState } from 'react'
import Modal from '../common/Modal'
import { hideCreatePostModal, getPosts, createPost } from '../features/postSlice'
import { getUserByUserName } from '../features/userSlice'
import { useSelector, useDispatch } from 'react-redux'
import { backendURL } from '../constants/BackendConfig'
import { getPostsProfile } from '../features/postsProfileSlice'
import { useLocation } from "react-router-dom";
import { matchPath } from "react-router"
import * as ROUTES from '../constants/Routes'

function CreatePostModal() {
    const dispatch = useDispatch()
    const location = useLocation()
    const [caption, setCaption] = useState('')
    const { createPostModal } = useSelector(state => state.post)
    const { currentUser, userFocus } = useSelector(state => state.user)


    const handleCreatePost = async () => {
        await dispatch(createPost({ caption, image: createPostModal.image }))

        if (location.pathname === ROUTES.DASHBOARD) {
            await dispatch(getPosts({ nextURL: null }))
        }

        if (!!matchPath(location.pathname, ROUTES.PROFILE)) {
            await dispatch(getUserByUserName({ username: userFocus.user.username }))
            await dispatch(getPostsProfile({ username: userFocus.user.username }))
        }
        dispatch(hideCreatePostModal())
    }

    return (
        <Modal show={createPostModal.show}>
            {/* Mobile ver */}
            <div className="max-w-screen-sm md:hidden mx-auto flex flex-col bg-white w-full">
                <div className="flex items-center p-2">
                    <img src={backendURL + currentUser.avatar_pic} alt={currentUser.username} className="w-10 h-10 rounded-full mr-2" />
                    <span className="font-semibold text-sm">{currentUser.username}</span>
                    <button className="ml-auto" onClick={() => dispatch(hideCreatePostModal())}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                <img src={createPostModal.imagePreview} alt="img-review" className="max-w-lg" />
                <div className="p-2">
                    <input
                        onChange={({ target }) => setCaption(target.value)}
                        type="text" className="w-80 focus:outline-none mb-5"
                        placeholder="Type your caption here..."
                    />
                    <button
                        onClick={handleCreatePost}
                        className="w-full h-8 rounded bg-blue-medium font-semibold
                                    text-sm focus:outline-none text-white">
                        Post
                    </button>
                </div>
            </div>
            {/* PC ver */}
            <div className="hidden container lg:max-w-screen-lg mx-auto md:flex justify-center">
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

                    <button
                        onClick={handleCreatePost}
                        className={`relative flex items-center justify-center w-full h-8 rounded bg-blue-medium
                                ${createPostModal.isFetching && 'text-blue-medium'} font-semibold text-sm focus:outline-none text-white`}
                        disabled={createPostModal.isFetching}
                    >
                        Post
                        {
                            createPostModal.isFetching && < img src="/svg/spinner.svg" className="w-10 absolute" alt="spinner" />
                        }
                    </button>
                </div>
            </div>
        </Modal>
    )
}

export default CreatePostModal
