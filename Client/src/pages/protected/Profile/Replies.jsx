import React from 'react'
import PostComments from '../../../components/Home/PostComments'
import { useSelector } from 'react-redux';

function Replies() {
  const {userProfile} = useSelector(state=>state.service);
  return (
    <div className='pt-5'>
      {userProfile?.replies?.map(comment=>{
        return <PostComments key={comment._id} comment={comment}/>
      })}
      {userProfile?.replies?.length == 0 &&
        <div className='text-center p-5'>
          {userProfile?.username} has no replies!
        </div>}
    </div>
  )
}

export default Replies
