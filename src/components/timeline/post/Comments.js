import { useState } from 'react';
import { Link } from 'react-router-dom';
const Comments = ({ allComments }) => {
    const [comments, setComments] = useState(allComments)
    const [commentsSlice, setCommentsSlice] = useState(2)

    return (
        <div className="mb-2 ml-1">
            {
                comments.length >= 3 && commentsSlice < comments.length && (
                    <button type="button" className="focus:outline-none">
                        <span className="text-gray-secondary text-sm">
                            View all {comments.length} comments
                        </span>
                    </button>
                )
            }
            {
                comments.slice(0, commentsSlice).map((comment) => (
                    <p key={`${comment.comment}-${comment.user}`}>
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
