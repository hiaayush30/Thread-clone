import React, { useRef, useState } from 'react'
import { CiEdit } from 'react-icons/ci'
import { IoClose } from 'react-icons/io5'

function EditProfile({ setEditProfile }) {
  const [profilePic,setProfilePic]=useState('defaultImg');
  const [username,setUsername]=useState('Arijit_Singh');
  const [email,setEmail]=useState('arijit@gmail.com');
  const [bio,setBio]=useState('Singer');
  const imageInputRef=useRef();
    return (
    <div className='flex justify-center items-center fixed inset-0'>
      <div className='absolute inset-0 bg-black opacity-80 z-20'></div>
      <div className='relative bg-white min-h-[50vh] w-[80vw] md:w-[50vw] z-30 rounded-md flex flex-col'>
        <button className='absolute right-0'
          onClick={() => setEditProfile(false)}>
          <IoClose title='Discard Changes' size={28} />
        </button>
        <div className='flex flex-col justify-center items-center gap-2'>
          <div className='font-semibold pt-5'>Edit Profile</div>
          <div className='rounded-full bg-slate-800 w-14 h-14 md:w-20 md:h-20 flex justify-center items-center'>
            <img src={profilePic} alt='username' className='text-white'></img>
          </div>
          <button onClick={()=>imageInputRef.current.click()}
          ><CiEdit /></button>
          <input ref={imageInputRef} type='file' accept='images/*' className='hidden'/>
        </div>
        <div className='flex flex-col m-3 my-5 gap-2'>
          <div className='font-semibold'>Username</div>
          <input type='text' value={username} className='p-1 outline-none cursor-pointer'
          onChange={(e)=>setUsername(e.target.value)}/>
        </div>
        <div className='flex flex-col m-3 my-5 gap-2'>
          <div className='font-semibold'>Email</div>
          <input type='text' value={email} className='p-1 outline-none cursor-pointer'
          onChange={(e)=>setEmail(e.target.value)}/>
        </div>
        <div className='flex flex-col m-3 my-5 gap-2'>
          <div className='font-semibold'>Bio</div>
          <input type='text' value={bio} className='p-1 outline-none cursor-pointer'
          onChange={(e)=>setBio(e.target.value)}/>
        </div>
        <button className='mb-2 p-1 border mx-4 rounded-md bg-blue-300 text-white hover:bg-blue-200'>UPDATE</button>
      </div>
    </div>
  )
}

export default EditProfile
