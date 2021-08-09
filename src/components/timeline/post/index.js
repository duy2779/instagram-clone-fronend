import { backendURL } from '../../../constants/BackendConfig'
import { useState, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import PostHeartOverlay from '../../../common/PostHeartOverlay';
import { useSelector, useDispatch } from 'react-redux'
import { postToggleLike } from '../../../features/postSlice'

import CommentInput from '../../../common/CommentInput'
import Header from './Header'
import PostInfo from './PostInfo'

const Post = ({ post }) => {
    const history = useHistory()
    const dispatch = useDispatch()
    const { user, caption, likes_count, image, created, users_like, comments } = post
    const [heartOverlay, setHeartOvelay] = useState(false);
    const [allComments, setAllComments] = useState(comments)

    const { currentUser } = useSelector((state) => state.user)
    const [toggleLike, setToggleLike] = useState(users_like.includes(currentUser.id))
    const [totalLikes, setTotalLikes] = useState(likes_count)

    const likeOnClick = async () => {
        dispatch(postToggleLike({ postID: post.id }))
        setToggleLike(!toggleLike)
        setTotalLikes((totalLikes) => toggleLike ? totalLikes - 1 : totalLikes + 1)
    }

    const commentInputRef = useRef(null)
    const handleFocus = () => {
        if (window.matchMedia("(min-width: 768px)").matches) {
            commentInputRef.current.focus()
        } else {
            history.push(`/p/${post.id}`)
        }
    }

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

    return (
        <div className="flex flex-col md:bg-white mb-6 md:border">
            {/* header */}
            <Header user={user} post={post} />
            <div className="relative post-img" onDoubleClick={imgDoubleClickHandle}>
                <img src={backendURL + image} alt="img" className="object-cover w-full" style={{ maxHeight: '800px' }} />
                {
                    heartOverlay && <PostHeartOverlay />
                }
            </div>
            {/* content */}
            <PostInfo
                totalLikes={totalLikes}
                likeOnClick={likeOnClick}
                toggleLike={toggleLike}
                post={post}
                postID={post.id}
                caption={caption}
                likes_count={likes_count}
                users_like={users_like}
                created={created}
                username={user.username}
                comments={allComments}
                handleFocus={handleFocus} />
            {/* footer: comment input */}
            <div className="hidden md:block">
                <CommentInput allComments={allComments} setAllComments={setAllComments} post_id={post.id} commentInputRef={commentInputRef} />
            </div>
        </div >
    )
}

export default Post
