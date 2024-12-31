import { useSelector } from 'react-redux'
import Input from '../../components/Home/Input'
import Post from '../../components/Home/Post'
import { useGetAllPostsQuery } from '../../redux/api'
import { useEffect, useState } from 'react'
import PostSkeleton from '../../components/skeletons/PostSkeleton'

export default function Home() {
  const [page, setPage] = useState(1);
  const [loadMore, setLoadMore] = useState(true);
  const { data, isLoading, isSuccess} = useGetAllPostsQuery(page);
  const {allPosts} = useSelector(state=>state.service);
  const [loading,setLoading] = useState(false);
  const handleLoadMore = () => {
    setLoading(true);
    setPage(page=>page + 1);
  }
  useEffect(()=>{
   if(data){
     if(data.posts.length < 3 ) setLoadMore(false);
     setLoading(false);
   }
  },[data])
  return (
    <>
      <div className='py-5 min-h-screen'>
        <Input />
        {!isLoading && allPosts.length == 0 && <div className='text-center p-5'>No Posts yet!</div>}
        {isSuccess && allPosts.map(post => {
          return <Post key={post._id} post={post} />
        })}
        {isLoading && (
          <>
            <PostSkeleton />
            <PostSkeleton />
            <PostSkeleton />
          </>
        )}
      </div>
      {loadMore ? <div className='text-center py-3 max-md:pb-16'>
        <button onClick={handleLoadMore}
          className='dark:bg-zinc-200 dark:text-black px-1 py-1 border-2 rounded-md hover:underline underline-offset-4 hover:bg-blue-50 bg-blue-100'
          >{loading ? 'Loading...':'Load More'}</button>
      </div>: <div className='text-center p-5'
      >No more posts today!</div>}
    </>
  )
}
