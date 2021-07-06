import { backendURL } from '../../constants/BackendConfig'
import Skeleton from 'react-loading-skeleton';
import { showPostModal } from '../../features/postsProfileSlice'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'

const Photos = ({ photos, postsCount }) => {
    const dispatch = useDispatch()
    const history = useHistory()

    const photoOnClick = (photo) => {
        if(window.matchMedia("(min-width: 768px)").matches){
            dispatch(showPostModal({ photo }))
        }else{
            history.push(`/p/${photo.id}`)
        }

    }

    return (
        <div className="border-t border-gray-primary mt-4 md:mt-12 md:mx-4">
            <div className="grid grid-cols-3 gap-1 md:gap-8 md:mt-4 mb-12 ">
                {
                    !photos
                        ? new Array(postsCount).fill(0).map((_, i) => <Skeleton key={i} width={288} height={288} />)
                        : postsCount > 0
                            ? photos.map((photo) => (
                                <div key={photo.id} className="relative group">
                                    <img src={backendURL + photo.image} alt={photo.caption} className="w-full h-full object-cover" style={{ aspectRatio: '1' }} />

                                    <div
                                        onClick={() => photoOnClick(photo)}
                                        className="absolute bottom-0 left-0 z-10 w-full justify-center items-center h-full bg-black-faded group-hover:flex hidden">
                                        <p className="flex items-center text-white font-bold mr-5">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 20 20"
                                                fill="currentColor"
                                                className="w-8 mr-2"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                            {photo.likes_count}
                                        </p>

                                        <p className="flex items-center text-white font-bold">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 20 20"
                                                fill="currentColor"
                                                className="w-8 mr-2"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                            {photo.comments_count}
                                        </p>
                                    </div>
                                </div>
                            ))
                            : null}
            </div>
            {!photos || (postsCount === 0 && <p className="text-center font-light text-3xl">No Posts Yet</p>)}
        </div>
    )
}

export default Photos
