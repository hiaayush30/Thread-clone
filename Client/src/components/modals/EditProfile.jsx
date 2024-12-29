import { useRef, useState } from 'react'
import { CiEdit } from 'react-icons/ci'
import { IoClose } from 'react-icons/io5'
import { useDispatch } from 'react-redux';
import { setOpenEditProfileModel } from '../../redux/features/service/serviceSlice';

function EditProfile() {
  const dispatch = useDispatch();
  const [profilePic,setProfilePic]=useState('/profilePic.png');
  const [username,setUsername]=useState('Arijit_Singh');
  const [email,setEmail]=useState('arijit@gmail.com');
  const [bio,setBio]=useState('Singer');
  const imageInputRef=useRef();
  const handleInputImage=(e)=>{
    setProfilePic(URL.createObjectURL(e.target.files[0]));
    // This URL is a blob: URL that provides access to the file's binary data stored in memory.
  }
    return (
    <div className='flex justify-center items-center fixed inset-0 dark:text-black'>
      <div className='absolute inset-0 bg-black opacity-80 z-20'></div>
      <div className='overflow-y-scroll max-h-[90vh] relative bg-white dark:bg-slate-200 min-h-[50vh] w-[80vw] md:w-[50vw] z-30 rounded-md flex flex-col'>
        <button className='absolute right-0'
          onClick={() => dispatch(setOpenEditProfileModel(false))}>
          <IoClose title='Discard Changes' size={28} />
        </button>
        <div className='flex flex-col justify-center items-center gap-2'>
          <div className='font-semibold pt-5'>Edit Profile</div>
          <div className='overflow-hidden rounded-full w-20 h-20 md:w-28 md:h-28 flex justify-center items-center'>
            <img className='w-full h-full object-cover' src={profilePic} alt='username'/>
          </div>
          <button onClick={()=>imageInputRef.current.click()}
          ><CiEdit /></button>
          <input onChange={handleInputImage}
          ref={imageInputRef} type='file' accept='images/*' className='hidden'/>
          {/* accept="image/png, image/jpeg",video/mp4, video/webm,audio/mp3, audio/wav" */}
          {/* can pass multiple arguments to accept like above */}
        </div>
        <div className='flex flex-col m-3 my-5 gap-2'>
          <div className='font-semibold'>Username</div>
          <input disabled type='text' value={username} className='p-1 outline-none cursor-pointer'
          onChange={(e)=>setUsername(e.target.value)}/>
        </div>
        <div className='flex flex-col m-3 my-5 gap-2'>
          <div className='font-semibold'>Email</div>
          <input disabled type='text' value={email} className='p-1 outline-none cursor-pointer'
          onChange={(e)=>setEmail(e.target.value)}/>
        </div>
        <div className='flex flex-col m-3 my-5 gap-2'>
          <div className='font-semibold'>Bio</div>
          <input type='text' value={bio} className='p-1 outline-none cursor-pointer dark:bg-slate-200'
          onChange={(e)=>setBio(e.target.value)}/>
        </div>
        <button className='mb-2 p-1 border mx-4 rounded-md dark:bg-zinc-800 dark:hover:bg-zinc-700 bg-blue-300 text-white hover:bg-blue-200'>UPDATE</button>
      </div>
    </div>
  )
}

export default EditProfile
