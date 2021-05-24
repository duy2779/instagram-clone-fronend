import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import InfiniteScroll from 'react-infinite-scroll-component';
import PostSkeleton from './PostSkeleton'

import Post from './post';
import { getPosts, clearPost } from '../../features/postSlice'

const Timeline = () => {
    const dispatch = useDispatch()
    const { posts } = useSelector((state) => state.post)
    const { results, next, count } = posts

    const [allPosts, setAllPosts] = useState([])
    const [hasMore, setHasMore] = useState(true)

    useEffect(() => {
        dispatch(getPosts({ nextURL: null }))

        return function cleanup() {
            dispatch(clearPost())
        }
    }, [dispatch])

    useEffect(() => {
        function addMoreToPosts() {
            if (!count) {
                return
            }
            if (count === 0) {
                setHasMore(false)
                return
            }
            setAllPosts(allPosts => allPosts.concat(results))
        }
        addMoreToPosts()
    }, [results, count])

    const getMorePosts = () => {
        if (allPosts.length >= count) {
            setHasMore(false)
            return;
        }
        dispatch(getPosts({ nextURL: next }))
    }

    return (
        <div className="container col-span-2">
            {
                !results ? (
                    <PostSkeleton />
                ) : allPosts.length > 0 ? (

                    <InfiniteScroll
                        dataLength={allPosts.length}
                        next={() => getMorePosts()}
                        hasMore={hasMore}
                        endMessage={
                            <p style={{ textAlign: 'center' }}>
                                <b>Yay! You have seen it all</b>
                            </p>
                        }
                    >
                        {

                            allPosts.map(post => <Post key={post.id} post={post} />)

                        }
                    </InfiniteScroll>
                ) : (
                    <p>No Posts</p>
                )
            }
        </div>
    )
}

export default Timeline
