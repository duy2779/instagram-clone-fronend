import { Link, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux'
import {showPostModal} from '../../../features/postsProfileSlice'

const Comments = ({ comments, post }) => {
    const commentsSlice = 2
    const dispatch = useDispatch()
    const history = useHistory()

    const viewAllCommentsOnClick = () => {
        if(window.matchMedia("(min-width: 768px)").matches){
            dispatch(showPostModal({ photo:post }))
        }else{
            history.push(`/p/${post.id}`)
        }

    }

    return (
        <div className="mb-2 ml-1">
            {
                comments.length >= 3 && commentsSlice < comments.length && (
                    <button type="button" className="focus:outline-none">
                        <span className="text-gray-secondary text-sm" onClick={viewAllCommentsOnClick}>
                            View all {comments.length} comments
                        </span>
                    </button>
                )
            }
            {
                comments.slice(comments.length - commentsSlice, comments.length).map((comment) => (
                    <p key={`${comment.id}-${comment.user}`}>
                        <Link to={`profile/${comment.user}`}>
                            <span className="text-sm font-semibold mr-1">{comment.user}</span>
                        </Link>
                        <span className="text-sm">{comment.comment}</span>
                    </p>
                ))
            }

        </div>
    )
}

export default Comments
