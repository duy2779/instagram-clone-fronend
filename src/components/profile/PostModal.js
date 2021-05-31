import { useState, useEffect } from 'react'
import Modal from '../../common/Modal'
import { showPostModal, hidePostModal } from '../../features/postsProfileSlice'
import { useSelector, useDispatch } from 'react-redux'
import { backendURL } from '../../constants/BackendConfig'
import Header from '../timeline/post/Header'
import CommentInput from '../../common/CommentInput'
import { Link } from 'react-router-dom'
import Comment from '../../common/Comment'

const imageStyles = {
    minWidth: '511px',
    minHeight: '511px',
    maxWidth: '704px',
    maxHeight: '600px',
}

function PostModal() {
    const dispatch = useDispatch()
    const { currentUser } = useSelector(state => state.user)
    const { postModal } = useSelector(state => state.postsProfile)
    const { post } = postModal
    const [allComments, setAllComments] = useState(null)

    useEffect(() => {
        setAllComments(post.comments)
    }, [post.comments])

    return (
        <Modal show={postModal.show} hide={hidePostModal}>
            <div className="max-w-screen-lg mx-auto flex">
                <div className="bg-black-base">
                    <img src={backendURL + post.image} alt={post.caption} className="object-contain" style={imageStyles} />
                </div>
                {/* post info */}
                <div className="bg-white w-80 flex flex-col">
                    <Header user={post.user} />
                    <div className="flex-grow p-3 border-t">
                        {
                            allComments && (
                                allComments.map((comment) => {
                                    return (
                                        <Comment key={comment.id} username={comment.user} comment={comment.comment} />
                                    )
                                })
                            )
                        }
                    </div>
                    <CommentInput allComments={allComments} setAllComments={setAllComments} post_id={post.id} />
                </div>
            </div>
        </Modal>
    )
}

export default PostModal
