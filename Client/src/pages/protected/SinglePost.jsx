import React, { useState } from 'react'
import Post from '../../components/Home/Post'
import PostComments from '../../components/Home/PostComments'

function SinglePost() {
    const [comment, setComment] = useState('');
    return (
        <div className='w-[80vw] md:w-[50vw] mx-auto'>
            <div className='flex flex-col justify-center items-center'>
                <Post src='/errorImage.jpg' />
                <div className='flex justify-between items-center w-full mt-2 border-b border-blue-300 my-2'>
                    <input onChange={(e) => setComment(e.target.value)}
                        className='p-2 w-[80%] outline-none'
                        type='text' placeholder='Enter a comment' />
                    <button className='font-medium text-xs md:text-sm py-1 px-2 bg-slate-200 hover:bg-slate-100 rounded-lg'
                    >Add</button>
                </div>
                <PostComments />
                <PostComments />
                <PostComments />
            </div>
        </div>
    )
}

export default SinglePost
