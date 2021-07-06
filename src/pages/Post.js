import Page from './Page'
import { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { backendURL } from '../constants/BackendConfig'
import CommentInput from '../common/CommentInput'
import Comment from '../common/Comment'
import Caption from '../common/Caption'
import PostTools from '../common/PostTools'
import { postToggleLike } from '../features/postSlice'
import Header from '../components/timeline/post/Header'
import { useParams, useHistory, Link } from 'react-router-dom'
import { get, getApiURL } from '../features/config'
import * as ROUTES from '../constants/Routes'
import { distanceDate } from '../helpers/formatDate'

const imageStyles = {
    maxWidth: '704px',
    maxHeight: '600px',
}

const Post = () => {
    const dispatch = useDispatch()
    const history = useHistory()

    const { currentUser } = useSelector(state => state.user)
    const { postID } = useParams()
    const [post, setPost] = useState(null)

    const [allComments, setAllComments] = useState(null)
    const [toggleLike, setToggleLike] = useState(false)
    const [totalLikes, setTotalLikes] = useState(0)

    const commentInputRef = useRef(null)
    const handleFocus = () => commentInputRef.current.focus()

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await get({
                    url: getApiURL(`post/get-post/${postID}`)
                })
                if (response.status === 200) {
                    setPost(response.data)
                }
                else {
                    history.push(ROUTES.NOT_FOUND)
                }
            } catch (error) {
                console.log(error)
            }
        }
        fetchData()
    }, [postID, history])

    useEffect(() => {
        if (post?.caption) {
            setToggleLike(post.users_like.includes(currentUser.id))
            setAllComments(post.comments)
            setTotalLikes(post.likes_count)
        }
        // eslint-disable-next-line
    }, [post])


    const likeOnClick = async () => {
        await dispatch(postToggleLike({ postID: post.id }))
        setToggleLike(!toggleLike)
        setTotalLikes((totalLikes) => toggleLike ? totalLikes - 1 : totalLikes + 1)
    }

    return post ? (
        <Page>
            <div className="md:hidden">
                <Header user={post.user} post={post} />
                <img src={backendURL + post.image} alt={post.caption} className="h-full w-full lg:h-auto lg:w-auto object-contain" style={imageStyles} />
                <div className="px-3 py-2">
                    <PostTools postID={post.id} users_like={post.users_like} likeOnClick={likeOnClick} toggleLike={toggleLike} handleFocus={handleFocus} />
                    <p className="text-sm font-semibold mt-2 ml-1">{totalLikes} likes</p>
                </div>
                <div className="flex mb-2 px-3">
                    <div className="flex items-center">
                        <Link to={`/profile/${post.user.username}`}>
                            <span className="col-span-8 text-sm font-semibold">{post.user.username}</span>
                        </Link>
                        <p className="text-sm ml-3">{post.caption}</p>
                    </div>
                </div>
                <p className="px-3 text-gray-secondary text-xxs leading-3 mb-5">{distanceDate(post.created).toUpperCase()}</p>
                <CommentInput allComments={allComments} setAllComments={setAllComments} post_id={post.id} commentInputRef={commentInputRef} />
            </div>
            {/* PC */}
            <div className="hidden lg:max-w-screen-lg mx-auto md:flex justify-center md:h-96 lg:h-auto" style={{ maxHeight: '600px' }}>
                <div className="bg-black-base md:w-1/2 lg:w-auto">
                    <img src={backendURL + post.image} alt={post.caption} className="h-full w-full lg:h-auto lg:w-auto object-contain" style={imageStyles} />
                </div>
                {/* post info */}
                <div className="bg-white w-80 flex flex-col">
                    <Header user={post.user} post={post} />
                    <div className="flex-grow p-3 border-t overflow-y-auto comments">
                        <Caption user={post.user} caption={post.caption} created={post.created} />
                        {
                            allComments && (
                                allComments.map((comment) => {
                                    return (
                                        <Comment key={comment.id} username={comment.user} comment={comment.comment} />
                                    )
                                })
                            )
                        }
                    </div>
                    <div className="p-3 border-t">
                        <PostTools postID={post.id} users_like={post.users_like} likeOnClick={likeOnClick} toggleLike={toggleLike} handleFocus={handleFocus} />
                        <p className="text-sm font-semibold mt-2 ml-1">{totalLikes} likes</p>
                    </div>
                    <CommentInput allComments={allComments} setAllComments={setAllComments} post_id={post.id} commentInputRef={commentInputRef} />
                </div>
            </div>
        </Page>
    ) : null
}

export default Post
