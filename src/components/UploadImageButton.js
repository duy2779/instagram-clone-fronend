import { useDispatch } from 'react-redux'
import { showCreatePostModal } from '../features/postSlice'

const UploadImageButton = () => {
    const dispatch = useDispatch()
    const selectedImageHandle = (e) => {
        const reader = new FileReader();
        reader.onload = () => {
            if (reader.readyState === 2) {
                dispatch(showCreatePostModal({ image: e.target.files[0], imagePreview: reader.result }))
            }
        }
        if (e.target.files[0]) {
            reader.readAsDataURL(e.target.files[0])
        }
    }

    return (
        <div>
            <label className="cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 active:opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <input type="file" className="hidden" onChange={selectedImageHandle} accept=".png, .jpg"/>
            </label>
        </div>
    )
}

export default UploadImageButton
