import AvatarUpdate from './AvatarUpdate'
import InfoForm from './InfoForm'
import { useSelector } from 'react-redux'

const ProfileEditForm = () => {
    const { currentUser, isFetching } = useSelector(state => state.user)

    return !isFetching ? (

        <div className="max-w-screen-lg mx-auto bg-white flex justify-center p-3 border">
            <div className="lg:w-11/12 flex flex-col lg:items-center">
                <AvatarUpdate user={currentUser} />
                <InfoForm user={currentUser} />
            </div>
        </div>
    ) : null
}

export default ProfileEditForm
