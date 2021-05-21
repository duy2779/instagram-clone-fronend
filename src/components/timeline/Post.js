import { backendURL } from '../../constants/BackendConfig'

const Post = ({ post }) => {
    const { user, caption, likes_count, image } = post

    return (
        <div className="flex flex-col">
            <p>{user}</p>
            <img src={backendURL + image} alt="img" />
            <p>{caption}</p>
            <p>{likes_count}</p>
        </div>
    )
}

export default Post
