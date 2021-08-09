import { distanceDate } from '../../../helpers/formatDate'
import PostTools from '../../../common/PostTools'

import Comments from './Comments'

const PostInfo = ({ username, caption, created, users_like, postID, comments, handleFocus, post, totalLikes, toggleLike, likeOnClick }) => {
    const distanceTime = distanceDate(created)

    return (
        <div className="px-3 py-2">
            {/* tool like, comment*/}
            <PostTools postID={postID} users_like={users_like} likeOnClick={likeOnClick} toggleLike={toggleLike} handleFocus={handleFocus} />
            <p className="text-sm font-semibold mt-2 ml-1">{totalLikes} likes</p>
            <p className="text-sm ml-1 mt-2">
                <span className="font-semibold">{username}</span>
                {` ${caption}`}
            </p>
            <Comments comments={comments} post={post} />
            <p className="ml-1 text-gray-secondary text-xxs leading-3">{distanceTime.toUpperCase()}</p>
        </div>
    )
}

export default PostInfo
