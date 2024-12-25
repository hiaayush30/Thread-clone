import React from 'react'
import { AiOutlineRetweet } from 'react-icons/ai';
import { FaRegComment, FaRegHeart, FaRegShareSquare } from 'react-icons/fa';
import { IoIosMore } from "react-icons/io";
import { useNavigate } from 'react-router-dom';

function Post(props) {
    const navigate=useNavigate();
    return (
        <div 
        onClick={()=> navigate('/post/1')}
        className='cursor-pointer py-5 hover:shadow-xl shadow-black p-2 transition-all duration-300 ease-in-out max-w-[90vw] md:max-w-[70vw] lg:max-w-[35vw] mx-auto'>
            <div className='flex justify-between px-5'>
                <div className='flex'>
                    <div className='rounded-full bg-slate-800 w-11 h-11 flex justify-center items-center'>
                        <img src='' alt='AJ' className='text-white'></img>
                    </div>
                    <div className='flex flex-col mx-1'>
                        <div className='font-semibold'>
                            Username</div>
                     
                            <div className='flex'>
                            <span className='lg:max-w-[20vw] md:max-w-[25vw] max-w-[40vw] overflow-x-hidden whitespace-nowrap' 
                            >This is the capioghrbgvrehbgrtejmh,muy,yun of tyumym yum,uyjmkyugjmrythe prevbvtymntnrtgyrtnrtytryn5ttynost, i hope you like it
                            </span>
                            <span>&nbsp; ...</span>
                            </div>
                    </div>
                </div>
                <div className='flex items-center gap-3'>
                    <div>
                        1d
                    </div>
                    <div>
                        <IoIosMore className='cursor-pointer' />
                    </div>
                </div>
            </div>
            <div className='py-1 mx-10 flex flex-col justify-between border-l-2 h-auto border-gray-500 text-center '>
                <div className='h-auto px-3'>
                    <img 
                    className='max-h-[50vh]'
                    loading='lazy'
                    height={"auto"}
                    width={"auto"}
                    src={props.src}/>
                </div>
                <div className='flex gap-5 px-5 py-2'>
                    <FaRegHeart size={20} className='cursor-pointer' />
                    <FaRegComment size={20} className='cursor-pointer' />
                    <AiOutlineRetweet size={20} className='cursor-pointer' />
                    <FaRegShareSquare size={20} className='cursor-pointer' />
                </div>
            </div>
            <div className='mx-11 flex gap-3 text-slate-500'>
                <div className="relative w-8 h-8">
                    {/* Bottom Circle */}
                    <div className="absolute w-8 h-8 bg-blue-500 rounded-full left-0 top-0 text-white flex justify-center items-center">+2</div>
                    {/* Top Circle */}
                    <div className="absolute w-8 h-8 bg-red-500 rounded-full right-6 top-1"></div>
                </div>
                <div>4 replies</div>
                <div>261 likes</div>
            </div>
        </div>
    )
}

export default Post
