import Skeleton from 'react-loading-skeleton';
const PostSkeleton = () => {
    return (
        <div className="flex flex-col bg-white mb-10 border">
            {/* header */}
            <div className="flex items-center px-3 py-2">
                <div className="flex items-center">
                    <Skeleton circle={true} height={40} width={40} className="mr-2" />
                    <div className="ml-2 flex flex-col">
                        <Skeleton width={150} />
                        <Skeleton width={100} />
                    </div>
                </div>
            </div>
            <Skeleton width={670} height={700} className="" />
        </div>
    )
}

export default PostSkeleton
