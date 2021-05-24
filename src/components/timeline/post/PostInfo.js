import { distanceDate } from '../../../helpers/formatDate'
import PostTools from '../../../common/PostTools'

const PostInfo = ({ username, likes_count, caption, created }) => {
    const distanceTime = distanceDate(created)
    return (
        <div className="px-3 py-2">
            {/* tool like, comment*/}
            <PostTools />
            <p className="text-sm font-semibold mt-2 ml-1">{likes_count} likes</p>
            <p className="text-sm ml-1 mt-2 mb-2">
                <span className="font-semibold">{username}</span>
                {` ${caption}`}
            </p>
            <p className="ml-1 text-gray-secondary text-xxs leading-3">{distanceTime.toUpperCase()}</p>
        </div>
    )
}

export default PostInfo
