import React from 'react'

function Input() {
  return (
    <div className='flex items-center w-[70%] h-24 justify-between p-2  border-b-2 border-gray-500 my-2 mx-auto'>
    <div className='flex gap-2'>
        <div className='rounded-full bg-slate-800 w-12 h-12 flex justify-center items-center'>
            <img src='' alt='AJ' className='text-white'></img>
        </div>
        <div placeholder='Start a thread' className='outline-none text-lg p-3'>
        Start a thread
        </div>
    </div>
    <button className='bg-slate-500 text-white py-1 px-2 rounded-lg hover:bg-slate-700'>Post</button>
    </div>
  )
}

export default Input