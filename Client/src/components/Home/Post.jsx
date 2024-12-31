import { useEffect, useState } from 'react'
import { AiOutlineRetweet } from 'react-icons/ai';
import { FaRegComment, FaRegHeart, FaRegShareSquare } from 'react-icons/fa';
import { IoIosMore } from "react-icons/io";
import { Link, useNavigate } from 'react-router-dom';
import PostMenu from '../menu/PostMenu';
import { useDispatch, useSelector } from 'react-redux';
import { addPostId } from '../../redux/features/service/serviceSlice';

function Post({ post }) {
    const dispatch = useDispatch();
    const { myInfo } = useSelector(state => state.service);
    const navigate = useNavigate();
    const [menuOpen, setMenuOpen] = useState(false);

    const [admin, setAdmin] = useState(false);
    const checkIsAdmin = () => {
        if (post.admin._id === myInfo._id) setAdmin(true);
    }
    useEffect(() => {
        if (post && myInfo) checkIsAdmin();
    }, [post, myInfo])

    function getTimeAgo(createdAt) {
        const now = new Date();
        const postDate = new Date(createdAt);
        const diffInSeconds = Math.floor((now - postDate) / 1000);

        if (diffInSeconds < 60) {
            return `${diffInSeconds}s`; // Seconds ago
        } else if (diffInSeconds < 3600) {
            const minutes = Math.floor(diffInSeconds / 60);
            return `${minutes}m`; // Minutes ago
        } else if (diffInSeconds < 86400) {
            const hours = Math.floor(diffInSeconds / 3600);
            return `${hours}h`; // Hours ago
        } else if (diffInSeconds < 2592000) {
            const days = Math.floor(diffInSeconds / 86400);
            return `${days}d`; // Days ago
        } else if (diffInSeconds < 31536000) {
            const months = Math.floor(diffInSeconds / 2592000);
            return `${months}m`; // Months ago
        } else {
            const years = Math.floor(diffInSeconds / 31536000);
            return `${years}y`; // Years ago
        }
    }
    return (
        <div onClick={(e) => setMenuOpen(false)}
            className='border-b-[1px] cursor-pointer py-5 hover:shadow-xl shadow-black p-2 transition-all duration-300 ease-in-out max-w-[90vw] md:max-w-[70vw] lg:max-w-[35vw] mx-auto'>
            <div className='flex justify-between px-5'>
                <div className='flex'>
                    <div className='rounded-full bg-slate-800 w-12 h-12 flex justify-center items-center'>
                        <img onClick={() => navigate(`/profile/threads/${post?.admin._id}`)}
                            src={post?.admin.profilePic} alt={post?.admin.username}
                            className='text-white h-full w-full object-cover rounded-full'></img>
                    </div>
                    <div className='flex flex-col mx-1'>
                        <div className='font-semibold'>
                            {post?.admin.username}</div>

                        <div className='flex'
                            onClick={() => navigate(`/profile/threads/${post?._id}`)}>
                            <span className='lg:max-w-[20vw] md:max-w-[25vw] max-w-[40vw] overflow-x-hidden whitespace-nowrap'
                            >{post?.text}
                            </span>
                            <span>...</span>
                        </div>
                    </div>
                </div>
                <div className='flex items-center gap-3'>
                    <div>
                        {getTimeAgo(post?.createdAt)}
                    </div>
                    {admin ? <div className='relative'>
                        <IoIosMore onClick={(e) => {
                            e.stopPropagation();
                            dispatch(addPostId(post._id));
                            setMenuOpen(!menuOpen);
                        }}
                            className={`transition-all duration-200 hover:bg-slate-100 dark:hover:bg-zinc-700 rounded-md cursor-pointer text-gray-500
                        ${menuOpen && 'rotate-90 text-black'}`} />
                        {menuOpen && <PostMenu id={post._id} />}
                    </div> : <div><IoIosMore /></div>}
                </div>
            </div>
            <div className='py-1 mx-10 flex flex-col justify-between border-l-2 h-auto border-gray-500 text-center '>
                <div className='h-auto px-3'>
                    <img
                        onClick={() => navigate(`/profile/threads/${post?.admin._id}`)}
                        className='max-h-[50vh]'
                        loading='lazy'
                        height={"auto"}
                        width={"auto"}
                        src={post?.media} />
                </div>
                <div className='flex gap-5 px-5 py-2'>
                    <FaRegHeart size={20} className='cursor-pointer' />
                    <FaRegComment size={20} className='cursor-pointer' />
                    <AiOutlineRetweet size={20} className='cursor-pointer' />
                    <FaRegShareSquare size={20} className='cursor-pointer' />
                </div>
            </div>
            <div className='mx-11 flex gap-3 text-slate-500 '>
                <div className="relative w-8 h-8">
                    {/* Bottom Circle */}
                    <div
                        className="absolute w-8 h-8 bg-zinc-700 rounded-full left-0 top-0 text-white flex justify-center items-center">
                        {'+' + (post?.comments.length - 1)}
                    </div>
                    {/* Top Circle */}
                    <div className="bg-[url('/errorImage.jpg')] absolute w-8 h-8 rounded-full right-6 top-1"></div>
                </div>
                <div>{post?.comments.length} replies</div>
                <Link onClick={(e) => e.stopPropagation()}
                    to={'/post/2'}>
                    <div className='hover:underline underline-offset-4'>{post?.likes.length} likes</div>
                </Link>
            </div>
        </div>
    )
}

export default Post
