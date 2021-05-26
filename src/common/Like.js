const Like = ({ likeOnClick, toggleLike }) => {
    return (
        <>
            <button className="mr-2 focus:outline-none" onClick={likeOnClick}>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={`h-8 w-8 ${toggleLike && 'fill-red text-red-500'}`}
                    fill="none" viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1"
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
            </button>
        </>
    )
}

export default Like
