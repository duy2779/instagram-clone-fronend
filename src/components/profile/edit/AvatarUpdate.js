import { backendURL } from '../../../constants/BackendConfig'
import { useDispatch } from 'react-redux'
import { updateAvatar } from '../../../features/userSlice'
import { showMessage } from '../../../features/appMessageSlice'

const AvatarUpdate = ({ user }) => {
    const dispatch = useDispatch()
    const updateAvatarPic = async (e) => {
        await dispatch(updateAvatar({ avatar: e.target.files[0] }))
        dispatch(showMessage({message:'Profile avatar updated'}))
    }

    return (
        <div className="flex md:justify-between w-9/12 gap-x-4">
            <div className="flex md:w-2/12 md:justify-end">
                <img src={backendURL + user.avatar_pic} alt={user.username} className="w-12 h-12 rounded-full object-cover" />
            </div>
            <div className="flex flex-col w-4/5">
                <p className="text-2xl">{user.username}</p>
                <label className="cursor-pointer">
                    <span className="font-semibold text-sm text-blue-medium">Change Profile Photo</span>
                    <input type="file" className="hidden" onChange={(e) => updateAvatarPic(e)} />
                </label>
            </div>
        </div>
    )
}

export default AvatarUpdate
