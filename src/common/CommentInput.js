import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addComment } from '../features/postSlice'
import { getPostsProfile } from '../features/postsProfileSlice'

const CommentInput = ({ setAllComments, allComments, post_id, commentInputRef }) => {
    const dispatch = useDispatch()

    const [commentInput, setCommentInput] = useState('')
    const { currentUser, userFocus } = useSelector((state) => state.user)
    const commentInputInValid = commentInput === ''

    const handleSubmit = async(e) => {
        e.preventDefault()
        await dispatch(addComment({ post_id, comment: commentInput }))
        setAllComments([...allComments, { user: currentUser.username, comment: commentInput }])
        setCommentInput('')
        if(userFocus.username){
            await dispatch(getPostsProfile({ username: userFocus.username }))
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="flex jutify-between items-center border-t">
                    <div className="p-3">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>

                    <input value={commentInput} type="text" placeholder="Add a comment..."
                        className="flex-grow focus:outline-none text-sm"
                        style={{backgroundColor:'transparent'}}
                        onChange={({ target }) => setCommentInput(target.value)}
                        ref={commentInputRef} />
                    <button type="submit" className={`font-semibold text-blue-medium focus:outline-none text-sm p-4
                    ${commentInputInValid && 'opacity-40'}`} disabled={commentInputInValid}>
                        Post
                    </button>
                </div>
            </form>
        </div>
    )
}

export default CommentInput
