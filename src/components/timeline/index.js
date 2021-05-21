import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'

import Post from './Post';
import { getPosts } from '../../features/postSlice'

const Timeline = () => {
    const dispatch = useDispatch()
    const { posts } = useSelector((state) => state.post)

    useEffect(() => {
        dispatch(getPosts())
    }, [dispatch])

    return (
        <div className="container col-span-2 bg-white">
            {
                posts.map(post => <Post post={post} />)
            }
        </div>
    )
}

export default Timeline
