import React, { useState } from 'react'
import { BsThreeDots } from 'react-icons/bs'
import { useDeleteCommentMutation } from '../../redux/api';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';

function PostComments({comment}) {
    console.log(comment)
    const [menuOpen, setMenuOpen] = useState(false);
    const {darkMode}  = useSelector(state=>state.service);
    const [deleteComment,{isLoading}] = useDeleteCommentMutation();
    const handleDelete=async()=>{
        try {
            setMenuOpen(false);
            await deleteComment({id:comment._id,postId:comment.post}).unwrap();
            toast.success('comment deleted', {
                theme: darkMode ? 'dark' : 'light',
                autoClose: 2000
            });
        } catch (error) {
            const message = error.data.message ? error.data.message:'Something went wrong!';
            toast.error(message , {
                theme: darkMode ? 'dark' : 'light',
                autoClose: 2000
            })
        }
    }
    return (
        <div className='border-black border-b h-20 mt-4 w-full'>
            <div className='flex justify-between items-center'>
                <div className='flex gap-2 items-center'>
                    <div className='rounded-full bg-slate-800 w-16 h-16 flex justify-center items-center'>
                        <img src={comment?.admin?.profilePic} alt='AJ' className='text-white h-full w-full object-cover rounded-full'></img>
                    </div>
                    <div className='flex flex-col'>
                        <div className='font-semibold'>{comment.admin.username}</div>
                        <div>{comment.text}</div>
                    </div>
                </div>
                <div className='flex justify-center items-center gap-1'>
                    <div>24min</div>
                    <div className='relative'>
                        <BsThreeDots onClick={() => setMenuOpen(!menuOpen)}
                            className={`transition-all duration-200 hover:bg-slate-100 dark:hover:bg-zinc-600  rounded-md cursor-pointer text-gray-500
                                ${menuOpen && 'rotate-90 text-black'}`} />
                        {menuOpen && <div className='absolute border cursor-pointer right-0 bg-slate-100 dark:text-white dark:bg-zinc-600 rounded-md p-1'>
                            <button onClick={handleDelete}
                                disabled={isLoading} className=' text-sm px-1 hover:scale-105 '>Delete</button>
                        </div>}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PostComments
