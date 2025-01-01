import React from 'react'
import Post from '../../../components/Home/Post'
import { useSelector } from 'react-redux';

//Posts which the user has reposted
function Reposts() {
  const {userProfile} = useSelector(state=>state.service);
  return (
    <div className='py-5'>
     {userProfile?.reposts?.map(post=>{
      return <Post key={post._id} post={post}/>
     })}
     {userProfile?.reposts?.length ==0 && 
     <div className='text-center p-5'>
      {userProfile?.username} has no reposts!
      </div>}
    </div>
  )
}

export default Reposts
