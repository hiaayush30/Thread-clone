import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useDeletePostMutation } from '../../redux/api'
import { toast } from 'react-toastify';
function PostMenu({ id }) {
  const {darkMode} = useSelector(state=>state.service);
  const [deletePost, { isLoading, isSuccess, isError }] = useDeletePostMutation();
  const handleDelete = async () => {
    try {
      const response=await deletePost(id).unwrap();
      console.log(response);
      toast.info('post deleted!', {
        theme: darkMode ? 'dark':'light',
        autoClose:2000
      })
    } catch (err) {
      toast.info('something went wrong!', {
        theme: darkMode ? 'dark':'light',
        autoClose:2000
      })
    }
  }
  return (
    <div className='dark:bg-zinc-700 absolute border cursor-pointer right-0 bg-slate-100 rounded-md p-1'>
      <button onClick={handleDelete} disabled={isLoading}
        className=' text-sm px-1 hover:scale-105 '>Delete</button>
    </div>
  )
}

export default PostMenu
