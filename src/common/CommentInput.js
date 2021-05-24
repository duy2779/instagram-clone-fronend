import { useState } from 'react'

const CommentInput = () => {
    const [commentInput, setCommentInput] = useState('')
    const commentInputInValid = commentInput === ''
    return (
        <div>
            <div className="grid grid-cols-12 items-center px-3 py-3 border-t">
                <button className="">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </button>
                <input type="text" placeholder="Add a comment..."
                    className="col-span-10 focus:outline-none text-sm"
                    onChange={({ target }) => setCommentInput(target.value)} />
                <button className={`font-semibold text-blue-medium focus:ouline-none text-sm
                 ${commentInputInValid && 'opacity-40'}`}>
                    Post
                </button>
            </div>
        </div>
    )
}

export default CommentInput
