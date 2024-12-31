import React, { useState } from 'react'
import { IoCloseCircleOutline, IoImages } from 'react-icons/io5'
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useAddCommentMutation } from '../../redux/api';

function CommentModel({ post, setCommentModel,refetch }) {
    const { darkMode } = useSelector(state => state.service);
    const [text, setText] = useState('');
    const [error, setError] = useState(false);
    const [addComment, { isLoading }] = useAddCommentMutation();
    const handleSubmit = async () => {
        if (text.trim().length == 0) return setError(true);
        try {
            await addComment({ id: post._id, text }).unwrap();
            toast.success('comment added', {
                autoClose: 2000,
                theme: darkMode ? 'dark' : 'light'
            });
            refetch();
            setCommentModel(false);
        } catch (error) {
            toast.error('Something went wrong!', {
                autoClose: 2000,
                theme: darkMode ? 'dark' : 'light'
            });
        }
    }
    return (
        <div className='fixed inset-0 flex justify-center items-center z-30 dark:text-black'>
            <div className='fixed inset-0 bg-zinc-800 opacity-85'></div>
            <div className='max-w-[90vw] gap-3 relative z-40 bg-white dark:bg-slate-100 rounded-lg md:w-[55vw] flex flex-col justify-between'>
                <IoCloseCircleOutline size={20} onClick={() => setCommentModel(false)} className='absolute top-1 right-1 cursor-pointer' />
                <div className='flex flex-col gap-3 p-5'>
                    <div className='flex gap-5'>
                        <div className='rounded-full bg-slate-800 w-12 h-12 flex justify-center items-center'>
                            <img src={post?.admin.profilePic} alt={post?.admin.username}
                                className='text-white h-full w-full rounded-full object-cover'></img>
                        </div>
                        <div className='flex flex-col justify-start'>
                            <p className='font-semibold'>{post?.admin.username}</p>
                            <div className='md:flex gap-3 items-center'>
                                {post?.media && <img src={post?.media} className='h-32' />}
                                <p className=''>{post?.text}</p>
                            </div>
                        </div>
                    </div>
                    <input value={text} onChange={(e) => setText(e.target.value)}
                        className='p-1 outline-none rounded-md' autoFocus
                        type='text' placeholder='add comment...'></input>
                    {error && <div className='text-red-500 text-sm'>Comment cannot be empty!</div>}
                </div>
                <div className='flex justify-between mb-2 mx-2'>
                    <div className=' text-sm  text-gray-700 p-1 rounded-lg'>Anyone can reply</div>
                    <button disabled={isLoading} onClick={handleSubmit}
                        className='hover:bg-slate-300 font-semibold p-1 bg-slate-400 text-white rounded-md'
                    >{isLoading ? 'Adding...' : 'Comment'}</button>
                </div>
            </div>
        </div>
    )
}

export default CommentModel
