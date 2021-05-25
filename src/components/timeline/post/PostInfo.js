import { distanceDate } from '../../../helpers/formatDate'
import PostTools from '../../../common/PostTools'
import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { postToggleLike } from '../../../features/postSlice'
import Comments from './Comments'

const PostInfo = ({ username, likes_count, caption, created, users_like, postID, comments }) => {
    const distanceTime = distanceDate(created)

    const dispatch = useDispatch()

    const { currentUser } = useSelector((state) => state.user)
    const [toggleLike, setToggleLike] = useState(users_like.includes(currentUser.id))
    const [totalLikes, setTotalLikes] = useState(likes_count)

    const likeOnClick = async () => {
        dispatch(postToggleLike({ postID }))
        setToggleLike(!toggleLike)
        setTotalLikes((totalLikes) => toggleLike ? totalLikes - 1 : totalLikes + 1)
    }

    return (
        <div className="px-3 py-2">
            {/* tool like, comment*/}
            <PostTools postID={postID} users_like={users_like} likeOnClick={likeOnClick} toggleLike={toggleLike} />
            <p className="text-sm font-semibold mt-2 ml-1">{totalLikes} likes</p>
            <p className="text-sm ml-1 mt-2">
                <span className="font-semibold">{username}</span>
                {` ${caption}`}
            </p>
            <Comments comments={comments} />
            <p className="ml-1 text-gray-secondary text-xxs leading-3">{distanceTime.toUpperCase()}</p>
        </div>
    )
}

export default PostInfo
