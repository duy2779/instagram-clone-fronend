import { backendURL } from '../constants/BackendConfig'
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { updateAvatar, updateInfo, getUser, clearUpdateInfo } from '../features/userSlice'
import { useHistory } from 'react-router-dom'
import * as ROUTES from '../constants/Routes'

const CompleteProfile = () => {
    const { currentUser, upload_info } = useSelector(state => state.user)
    const [username, setUserName] = useState('');
    const [fullname, setFullname] = useState('');
    const [email, setEmail] = useState('');

    const formIsInvalid = username === '' || fullname === '' || email === ''
    const dispatch = useDispatch()
    const history = useHistory()

    const updateAvatarPic = async (e) => {
        await dispatch(updateAvatar({ avatar: e.target.files[0] }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        await dispatch(updateInfo({ username, full_name: fullname, email }))
    }

    useEffect(() => {
        if (upload_info.success) {
            dispatch(clearUpdateInfo())
            dispatch(getUser())
            history.push(ROUTES.DASHBOARD)
        }
    }, [upload_info.success])

    return (
        <div className="container mx-auto max-w-screen-md h-screen flex items-center justify-center">
            <div className="flex flex-col justify-center items-center gap-y-2 w-1/2 p-5 border bg-white">
                <p className="text-2xl font-semibold mb-10">Complete Your Profile</p>
                <img src={backendURL + currentUser.avatar_pic} alt="your-avatar" className="w-20 h-20 rounded-full object-cover" />
                <div>
                    <label className="cursor-pointer">
                        <span className="font-semibold text-sm text-blue-medium">Upload Your Profile Photo</span>
                        <input type="file" className="hidden" onChange={(e) => updateAvatarPic(e)} />
                    </label>
                </div>
                <form className="w-full px-4" onSubmit={handleSubmit}>
                    <input
                        aria-label="Enter your username"
                        type="text"
                        placeholder="Username"
                        className="text-xs text-gray-base w-full
                            py-5 px-4 h-2 border border-gray-primary rounded mb-2 
                            bg-gray-background focus:outline-none focus:border-gray-secondary"
                        onChange={({ target }) => setUserName(target.value)}
                    />
                    <input
                        aria-label="Enter your email"
                        type="email"
                        placeholder="Email"
                        className="text-xs text-gray-base w-full
                            py-5 px-4 h-2 border border-gray-primary rounded mb-2 
                            bg-gray-background focus:outline-none focus:border-gray-secondary"
                        onChange={({ target }) => setEmail(target.value)}
                    />
                    <input
                        aria-label="Enter your fullname"
                        type="text"
                        placeholder="Fullname"
                        className="text-xs text-gray-base w-full
                            py-5 px-4 h-2 border border-gray-primary rounded mb-2 
                            bg-gray-background focus:outline-none focus:border-gray-secondary"
                        onChange={({ target }) => setFullname(target.value)}
                    />
                    {upload_info.error_message && (
                        <p className="text-sm text-red-primary text-center">
                            {
                                upload_info.error_message.username ?
                                    upload_info.error_message.username :
                                    upload_info.error_message.email ?
                                        upload_info.error_message.email :
                                        upload_info.error_message
                            }
                        </p>)
                    }
                    <button disabled={formIsInvalid || upload_info.pending} type="submit" className={`
                        bg-blue-medium  w-full rounded mt-2 h-8 font-semibold text-sm text-white focus:outline-none
                        ${formIsInvalid && 'opacity-40'}`
                    }>
                        {
                            upload_info.pending ? <img src="/svg/spinner.svg" className="h-full w-15 mx-auto" alt="spinner" /> :
                                'Complete'
                        }
                    </button>
                </form>
            </div>
        </div>
    )
}

export default CompleteProfile
