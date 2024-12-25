import React from 'react'
import { BsThreeDots } from 'react-icons/bs'

function PostComments() {
    return (
        <div className='border-black border-b h-20 mt-4 w-full'>
            <div className='flex justify-between items-center'>
                <div className='flex gap-2 items-center'>
                <div className='rounded-full bg-slate-800 w-16 h-16 flex justify-center items-center'>
                    <img src='' alt='AJ' className='text-white'></img>
                </div>
                <div className='flex flex-col'>
                    <div className='font-semibold'>Username</div>
                    <div>this is a comment</div>
                </div>
                </div>
                <div className='flex justify-center items-center gap-1'>
                    <div>24min</div>
                    <BsThreeDots className='cursor-pointer'/>
                </div>
            </div>
        </div>
    )
}

export default PostComments
