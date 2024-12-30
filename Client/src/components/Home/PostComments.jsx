import React, { useState } from 'react'
import { BsThreeDots } from 'react-icons/bs'

function PostComments() {
    const [menuOpen, setMenuOpen] = useState(false);
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
                    <div className='relative'>
                        <BsThreeDots onClick={() => setMenuOpen(!menuOpen)}
                            className={`transition-all duration-200 hover:bg-slate-100 dark:hover:bg-zinc-600  rounded-md cursor-pointer text-gray-500
                                ${menuOpen && 'rotate-90 text-black'}`} />
                        {menuOpen && <div className='absolute border cursor-pointer right-0 bg-slate-100 dark:text-white dark:bg-zinc-600 rounded-md p-1'>
                            <div className=' text-sm px-1 hover:scale-105 '>Delete</div>
                        </div>}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PostComments
