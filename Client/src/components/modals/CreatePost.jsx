import { useRef, useState } from 'react'
import { IoCloseCircleOutline, IoImages } from 'react-icons/io5'
import { useDispatch, useSelector} from 'react-redux'
import { setOpenAddPostModel } from '../../redux/features/service/serviceSlice';
import { useAddPostMutation } from '../../redux/api';
import { toast } from 'react-toastify';

function CreatePost() {
    const {darkMode} = useSelector(state=>state.service);
    const dispatch=useDispatch();
    const {myInfo} = useSelector(state=>state.service);
    const [text, setText] = useState('');
    const [media, setMedia] = useState(null);
    const mediaRef = useRef();
    const handleMediaRef = () => {
        mediaRef.current.click();
    }
    const toastOptions={
        theme:darkMode ? 'dark':'light',
        autoClose:2000
    }
    const [addPost,{isLoading,isError,isSuccess}] = useAddPostMutation();
    const handlePost=async()=>{
        try {
            if(text.trim().length==0)return toast.error('caption cannot be empty',toastOptions);
            const formData = new FormData();
            formData.append('text',text);
            formData.append('media',media);
            await addPost(formData).unwrap();
            toast.success('post uploaded!',toastOptions);
            dispatch(setOpenAddPostModel(false));
        } catch (error) {
            console.log(error);
            toast.error('something went wrong!',toastOptions);
        }
    }
    return (
        <div className='fixed inset-0 flex justify-center items-center z-30 dark:text-black'>
            <div className='fixed inset-0 bg-zinc-800 opacity-85'></div>
            <div className='max-w-[90vw] gap-3 relative z-40 bg-white dark:bg-slate-100 rounded-lg md:w-[55vw] flex flex-col justify-between'>
                <IoCloseCircleOutline size={20} onClick={() => dispatch(setOpenAddPostModel(false))} className='absolute top-1 right-1 cursor-pointer' />
                <div className='flex gap-3 p-5'>
                    <div className='rounded-full bg-slate-800 w-12 h-12 flex justify-center items-center'>
                        <img src={myInfo.profilePic} alt='AJ' 
                        className='text-white h-full w-full rounded-full object-cover'></img>
                    </div>
                    <div className='flex flex-col justify-start'>
                        <p className='font-semibold'>{myInfo.username}</p>
                        <textarea value={text} onChange={(e) => setText(e.target.value)} autoFocus placeholder='Start a thread...' type='text'
                            className='dark:bg-slate-100 mb-2 md:w-[40vw] resize-none md:min-h-20 cursor-pointer outline-none py-2'></textarea>
                        {media &&
                            <div className='overflow-y-scroll max-h-[40vh]'>
                                <img height={350} width={350} src={URL.createObjectURL(media)}
                                className='object-contain' />
                            </div>
                        }
                        <div className='m-2'>
                            <IoImages className='cursor-pointer'
                                onClick={handleMediaRef} />
                            <input onChange={(e) => setMedia(e.target.files[0])}
                                ref={mediaRef} type='file' accept='image/*' className='hidden' />
                        </div>
                    </div>
                </div>
                <div className='flex justify-between mb-2 mx-2'>
                    <div className=' text-sm  text-gray-700 p-1 rounded-lg'>Anyone can reply</div>
                    <button onClick={handlePost} disabled={isLoading}
                    className='hover:bg-slate-300 font-semibold p-1 bg-slate-400 text-white rounded-md'
                    >{isLoading ? 'Posting...':'Post'}</button>
                </div>
            </div>
        </div>
    )
}
export default CreatePost