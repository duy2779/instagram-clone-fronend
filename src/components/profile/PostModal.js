import { useState, useEffect } from 'react'
import Modal from '../../common/Modal'
import { hidePostModal } from '../../features/postsProfileSlice'
import { useSelector, useDispatch } from 'react-redux'
import { backendURL } from '../../constants/BackendConfig'
import Header from '../timeline/post/Header'
import CommentInput from '../../common/CommentInput'
import Comment from '../../common/Comment'
import Caption from '../../common/Caption'
import PostTools from '../../common/PostTools'
import { postToggleLike } from '../../features/postSlice'
import { getPostsProfile } from '../../features/postsProfileSlice'

const imageStyles = {
    minWidth: '450px',
    minHeight: '450px',
    maxWidth: '704px',
    maxHeight: '600px',
}

function PostModal() {
    const dispatch = useDispatch()
    const { currentUser, userFocus } = useSelector(state => state.user)
    const { postModal } = useSelector(state => state.postsProfile)
    const { post } = postModal
    const [allComments, setAllComments] = useState(null)
    const [toggleLike, setToggleLike] = useState(false)
    const [totalLikes, setTotalLikes] = useState(0)

    useEffect(() => {
        if (post.caption) {
            setToggleLike(post.users_like.includes(currentUser.id))
            setAllComments(post.comments)
            setTotalLikes(post.likes_count)
        }
        // eslint-disable-next-line
    }, [post])


    const likeOnClick = async () => {
        await dispatch(postToggleLike({ postID: post.id }))
        await dispatch(getPostsProfile({ username: userFocus.username }))
        setToggleLike(!toggleLike)
        setTotalLikes((totalLikes) => toggleLike ? totalLikes - 1 : totalLikes + 1)
    }

    return post ? (
        <Modal show={postModal.show} hide={hidePostModal}>
            <div className="max-w-screen-lg mx-auto flex">
                <div className="bg-black-base">
                    <img src={backendURL + post.image} alt={post.caption} className="object-contain" style={imageStyles} />
                </div>
                {/* post info */}
                <div className="bg-white w-80 flex flex-col">
                    <Header user={post.user} post={post} />
                    <div className="flex-grow p-3 border-t">
                        <Caption user={userFocus} caption={post.caption} created={post.created} />
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
                    <div className="p-3 border-t">
                        <PostTools postID={post.id} users_like={post.users_like} likeOnClick={likeOnClick} toggleLike={toggleLike} />
                        <p className="text-sm font-semibold mt-2 ml-1">{totalLikes} likes</p>
                    </div>
                    <CommentInput allComments={allComments} setAllComments={setAllComments} post_id={post.id} />
                </div>
            </div>
        </Modal>
    ) : null
}

export default PostModal
