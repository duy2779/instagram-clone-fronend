import { backendURL } from '../../../constants/BackendConfig'

const AvatarUpdate = ({ user }) => {
    return (
        <div className="items-center grid grid-cols-6 w-9/12">
            <div className="flex justify-end mr-10">
                <img src={backendURL + user.avatar_pic} alt={user.username} className="w-12 h-12 rounded-full" />
            </div>
            <div className="flex flex-col col-span-4">
                <p className="text-2xl">{user.username}</p>
                <span className="font-semibold text-sm text-blue-medium cursor-pointer">Change Profile Photo</span>
            </div>
        </div>
    )
}

export default AvatarUpdate
