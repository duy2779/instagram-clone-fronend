import { backendURL } from '../../../constants/BackendConfig'

import CommentInput from '../../../common/CommentInput'
import Header from './Header'
import PostInfo from './PostInfo'

const Post = ({ post }) => {
    const { user, caption, likes_count, image, created } = post

    return (
        <div className="flex flex-col bg-white mb-10 border">
            {/* header */}
            <Header user={user} />
            <img src={backendURL + image} alt="img" />
            {/* middle */}
            <PostInfo caption={caption} likes_count={likes_count} created={created} username={user.username} />
            {/* bottom: comment input */}
            <CommentInput />
        </div >
    )
}

export default Post
