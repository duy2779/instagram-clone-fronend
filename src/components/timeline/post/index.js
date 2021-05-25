import { backendURL } from '../../../constants/BackendConfig'
import { useState } from 'react';

import CommentInput from '../../../common/CommentInput'
import Header from './Header'
import PostInfo from './PostInfo'

const Post = ({ post }) => {
    const { user, caption, likes_count, image, created, users_like, comments } = post
    const [allComments, setAllComments] = useState(comments)

    return (
        <div className="flex flex-col bg-white mb-10 border">
            {/* header */}
            <Header user={user} />
            <img src={backendURL + image} alt="img" />
            {/* middle */}
            <PostInfo
                postID={post.id}
                caption={caption}
                likes_count={likes_count}
                users_like={users_like}
                created={created}
                username={user.username}
                comments={allComments} />
            {/* bottom: comment input */}
            <CommentInput allComments={allComments} setAllComments={setAllComments} post_id={post.id} />
        </div >
    )
}

export default Post
