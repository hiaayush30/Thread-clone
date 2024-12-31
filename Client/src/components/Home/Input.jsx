import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setOpenAddPostModel } from '../../redux/features/service/serviceSlice';

function Input() {
  const {myInfo} = useSelector(state=>state.service);
  const dispatch = useDispatch();
  return (
    <div className='max-md:hidden flex items-center w-[70%] h-24 justify-between p-2  border-b-2 border-gray-500 my-2 mx-auto'>
    <div className='flex gap-2'>
        <div className='rounded-full bg-slate-800 w-12 h-12 flex justify-center items-center'>
            <img src={myInfo.profilePic} alt={myInfo.username}  
            className='text-white h-full w-full rounded-full object-cover'></img>
        </div>
        <div onClick={()=>dispatch(setOpenAddPostModel(true))}
        className='outline-none text-lg p-3 cursor-pointer'>
        Start a thread . . .
        </div>
    </div>

    </div>
  )
}

export default Input
