import Like from "./Like"

const PostTools = ({ users_like, postID, likeOnClick, toggleLike, handleFocus }) => {
    return (
        <div className="flex justify-between items-center">
            {/* left */}
            <div className="flex items-center">
                <Like postID={postID} users_like={users_like} likeOnClick={likeOnClick} toggleLike={toggleLike} />
                <button className="mr-2 focus:outline-none" onClick={handleFocus}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                </button>
            </div>
            {/* right */}
            {/* <button className="focus:outline-none">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                </svg>
            </button> */}
        </div>
    )
}

export default PostTools
