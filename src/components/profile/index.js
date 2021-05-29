import Header from './Header'
import Photos from './Photos'

function UserProfile({ user, photos }) {

    return (
        <>
            <Header user={user} />
            <Photos postsCount={user.posts_count} photos={photos} />
        </>
    )
}

export default UserProfile
