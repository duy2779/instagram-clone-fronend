import { useState } from 'react'
import { backendURL } from '../../constants/BackendConfig'
import { distanceDate } from '../../helpers/formatDate'

const Post = ({ post }) => {
    const { user, caption, likes_count, image, created } = post
    const distanceTime = distanceDate(created)

    const [commentInput, setCommentInput] = useState('')
    const commentInputInValid = commentInput === ''

    return (
        <div className="flex flex-col bg-white mb-10 border">
            {/* header */}
            <div className="flex justify-between items-center px-3 py-2">
                <div className="flex items-center">
                    <img
                        src={backendURL + user.avatar_pic}
                        alt={`${user.username}_avatar`}
                        className="w-10 h-10 rounded-full mr-3"
                    />
                    <p className="col-span-8 text-sm font-semibold">{user.username}</p>
                </div>
                <button className="focus:outline-none">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
                    </svg>
                </button>
            </div>
            <img src={backendURL + image} alt="img" />
            {/* middle */}
            <div className="px-3 py-2">
                {/* tool like, comment*/}
                <div className="flex justify-between items-center">
                    {/* left */}
                    <div className="flex items-center">
                        <button className="mr-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                            </svg>
                        </button>
                        <button className="mr-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                            </svg>
                        </button>
                    </div>
                    {/* right */}
                    <button className="focus:outline-none">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                        </svg>
                    </button>
                </div>
                <p className="text-sm font-semibold mt-2 ml-1">{likes_count} likes</p>
                <p className="text-sm ml-1 mt-2 mb-2">
                    <span className="font-semibold">{user.username}</span>
                    {` ${caption}`}
                </p>
                <p className="ml-1 text-gray-secondary text-xxs leading-3">{distanceTime.toUpperCase()}</p>
            </div>
            {/* bottom: comment input */}
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

export default Post
