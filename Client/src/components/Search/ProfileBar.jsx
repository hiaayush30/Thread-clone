import React from 'react'

function ProfileBar() {
    return (
        <div className='md:w-[50vw] flex justify-start w-[80vw] py-2 my-2 hover:shadow-lg transition-all duration-300'>
            <div className='mx-4 rounded-full bg-slate-800 w-11 h-11 flex justify-center items-center'>
                <img src='' alt='AJ' className='text-white'></img>
            </div>
            <div className='w-[80%] flex border-b justify-between items-start'>
                <div className='flex flex-col gap-2'>
                    <div>
                        <div className='font-semibold'>Username</div>
                        <div>Bio</div>
                    </div>
                    <div className='font-light'>
                        47.9K followers
                    </div>
                </div>
                <button 
                className='dark:bg-zinc-200 dark:hover:scale-105 px-4 py-1 border rounded-lg text-zinc-800 font-medium hover:bg-slate-100'
                >Follow</button>
            </div>
        </div>
    )
}

export default ProfileBar