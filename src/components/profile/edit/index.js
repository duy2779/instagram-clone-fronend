import AvatarUpdate from './AvatarUpdate'
import InfoForm from './InfoForm'
import { useSelector } from 'react-redux'

const ProfileEditForm = () => {
    const { currentUser } = useSelector(state => state.user)

    return (
        <div className="max-w-screen-lg mx-auto bg-white flex justify-center p-3 border">
            <div className="w-11/12 flex flex-col items-center">
                <AvatarUpdate user={currentUser} />
                <InfoForm user={currentUser} />
            </div>
        </div>
    )
}

export default ProfileEditForm
