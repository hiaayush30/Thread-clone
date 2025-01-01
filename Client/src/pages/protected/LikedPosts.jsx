import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Post from '../../components/Home/Post';
import { useGetAllPostsQuery } from '../../redux/api';

function LikedPosts() {
  const {myInfo,allPosts} = useSelector(state=>state.service);
  console.log(allPosts);
  const {refetch} = useGetAllPostsQuery();
  const [filteredPosts,setFilteredPosts] = useState(()=>{
    return allPosts.filter(post=>post.likes.some(e=>e._id==myInfo._id));
  });
  return (
    <div className='min-h-screen'>
        {filteredPosts.map(post=>{
            return <Post key={post._id} post={post} refetch={refetch}/>
        })}
        {
            filteredPosts.length ==0 && <div className='p-5 text-center'>You have not liked any posts!</div>
        }
    </div>
  )
}

export default LikedPosts
