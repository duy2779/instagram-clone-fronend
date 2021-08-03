import ProfileEditForm from '../components/profile/edit'
import Page from './Page'
import { useSelector } from 'react-redux'
import LoadingPage from '../components/LoadingPage'

const ProfileEdit = () => {
    const { currentUser } = useSelector(state => state.user)

    return currentUser?.username ? (
        <Page>
            <ProfileEditForm />
        </Page>
    ) : <LoadingPage />
}

export default ProfileEdit
