import React from 'react'
import Post from '../../../components/Home/Post'

function Threads() {
  return (
    <div className='py-5'>
     <Post/>
     <Post/>
     <Post src='/errorImage.jpg'/>
    </div>
  )
}

export default Threads
