import { useState, useEffect, useRef } from 'react'
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
import PostHeartOverlay from '../../common/PostHeartOverlay'

const imageStyles = {
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
    const [heartOverlay, setHeartOvelay] = useState(false);

    const commentInputRef = useRef(null)
    const handleFocus = () => commentInputRef.current.focus()

    useEffect(() => {
        if (post.caption) {
            setToggleLike(post.users_like.includes(currentUser.id))
            setAllComments(post.comments)
            setTotalLikes(post.likes_count)
        }
        // eslint-disable-next-line
    }, [post])

    const imgDoubleClickHandle = () => {
        setHeartOvelay(true)
        setTimeout(() => {
            setHeartOvelay(false)
        }, 1000)
        if (toggleLike) {
            return
        }
        likeOnClick()
    }


    const likeOnClick = async () => {
        setToggleLike(!toggleLike)
        setTotalLikes((totalLikes) => toggleLike ? totalLikes - 1 : totalLikes + 1)
        await dispatch(postToggleLike({ postID: post.id }))
        await dispatch(getPostsProfile({ username: userFocus.user.username }))
    }

    return post ? (
        <Modal show={postModal.show} hide={hidePostModal}>
            <div className="max-w-screen-sm lg:max-w-screen-lg mx-auto flex md:h-96 lg:h-auto" style={{ maxHeight: '600px' }}>
                <div className="bg-black-base md:w-1/2 lg:w-auto flex post-img relative" onDoubleClick={imgDoubleClickHandle}>
                    <img src={backendURL + post.image} alt={post.caption} className="h-full w-full lg:h-auto lg:w-auto object-contain" style={imageStyles} />
                    {
                        heartOverlay && <PostHeartOverlay />
                    }
                </div>
                {/* post info */}
                <div className="bg-white w-80 flex flex-col">
                    <Header user={post.user} post={post} />
                    <div className="flex-grow p-3 border-t overflow-y-auto comments">
                        <Caption user={post.user} caption={post.caption} created={post.created} />
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
                        <PostTools postID={post.id} users_like={post.users_like} likeOnClick={likeOnClick} toggleLike={toggleLike} handleFocus={handleFocus} />
                        <p className="text-sm font-semibold mt-2 ml-1">{totalLikes} likes</p>
                    </div>
                    <CommentInput allComments={allComments} setAllComments={setAllComments} post_id={post.id} commentInputRef={commentInputRef} />
                </div>
            </div>
        </Modal>
    ) : null
}

export default PostModal
