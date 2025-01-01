import React from 'react'
import Post from '../../../components/Home/Post'
import { useSelector } from 'react-redux'

function Threads() {
  const {userProfile} = useSelector(state=>state.service);
  console.log(userProfile);
  return (
    <div className='py-5'>
     {userProfile?.threads?.map(post=>{
      return <Post key={post._id} post={post}/>
     })}
     {userProfile?.threads?.length ==0 && 
     <div className='text-center p-5'>
      {userProfile?.username} has no posts!
      </div>}
    </div>
  )
}

export default Threads
