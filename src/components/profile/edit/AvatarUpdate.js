import { backendURL } from '../../../constants/BackendConfig'
import { useDispatch } from 'react-redux'
import { updateAvatar } from '../../../features/userSlice'

const AvatarUpdate = ({ user }) => {
    const dispatch = useDispatch()

    return (
        <div className="items-center grid grid-cols-6 w-9/12">
            <div className="flex justify-end mr-10">
                <img src={backendURL + user.avatar_pic} alt={user.username} className="w-12 h-12 rounded-full" />
            </div>
            <div className="flex flex-col col-span-4">
                <p className="text-2xl">{user.username}</p>
                <label className="cursor-pointer">
                    <span className="font-semibold text-sm text-blue-medium">Change Profile Photo</span>
                    <input type="file" className="hidden" onChange={(e) => dispatch(updateAvatar({ avatar: e.target.files[0] }))} />
                </label>
            </div>
        </div>
    )
}

export default AvatarUpdate
