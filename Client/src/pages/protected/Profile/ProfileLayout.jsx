import React, { useState } from 'react'
import { FaInstagram } from 'react-icons/fa'
import { Link, NavLink, Outlet, useParams } from 'react-router-dom'
import EditProfile from '../../../components/modals/EditProfile';
import { useDispatch, useSelector } from 'react-redux';
import { setOpenEditProfileModel, setUserProfile } from '../../../redux/features/service/serviceSlice';
import { useMyInfoQuery, useUserDetailsQuery } from '../../../redux/api';
import ProfileLayoutSkeleton from '../../../components/skeletons/ProfileLayoutSkeleton'
import Error from '../../../pages/Error'
function ProfileLayout() {
  const dispatch = useDispatch();
  const openEditProfileModel = useSelector(state => state.service.openEditProfileModel);
  const params = useParams();
  const { data, isLoading, isError } = useUserDetailsQuery(params.id);
  dispatch(setUserProfile(data?.user));
  const { myInfo } = useSelector(state => state.service)
  if (isLoading) return <div className='flex justify-center min-h-screen min-w-screen'><ProfileLayoutSkeleton /></div>
  if (isError) return <Error/>
  return (
    <div className='flex flex-col md:w-[50vw] mx-auto w-[90vw] min-h-screen'>
      <div className='p-1 flex flex-col gap-4 mt-10'>
        <div className='flex justify-between w-[100%]'>
          <div className='flex flex-col p-1'>
            <div className='font-semibold text-xl'>
              {data?.user.username}</div>
            <div className='flex gap-1 justify-center items-center'>
              <div>{data?.user._id}</div>
              <div className='cursor-pointer text-xs px-1 py-1 bg-slate-200 dark:bg-zinc-600 rounded-lg'>threads.net</div>
            </div>
          </div>
          <div className='rounded-full bg-slate-800 w-20 h-20'>
            <img src={data?.user.profilePic} alt={data?.user.username}
              className='text-white h-full w-full rounded-full object-cover'></img>
          </div>
        </div>
        <div className='p-1'>{data?.user.bio}</div>
        <div className='flex justify-between items-center w-[100%] p-1'>
          <div className='flex items-center justify-center gap-4'>
            <div className='relative h-8 w-8'>
              {data?.user.followers.length >= 2 && <>
                <div className='absolute top-0 left-0 w-6 h-6 bg-red-500 rounded-full'>
                  <img src={data?.user.followers[0].profilePic} 
                  className='h-full w-full rounded-full bg-cover'/>
                </div>
                <div className='absolute left-4 w-6 h-6 bg-blue-500 rounded-full'>
                <img src={data?.user.followers[1].profilePic} 
                  className='h-full w-full rounded-full bg-cover'/>
                </div>
              </>}
            </div>
            <div className='hover:underline underline-offset-2 cursor-pointer'
            >{data?.user.followers.length} followers</div>
          </div>
          <div>
            <FaInstagram size={28} className='cursor-pointer' />
          </div>
        </div>
      </div>
      {(data?.user._id == myInfo._id) && <button onClick={() => dispatch(setOpenEditProfileModel(true))}
        className='border rounded-lg my-5 py-1 font-semibold hover:bg-slate-100 dark:hover:bg-zinc-700 dark:bg-zinc-800'
      >Edit Profile</button>}
      <div className='flex justify-center gap-0 border-b'>
        <NavLink to={`/profile/threads/${data?.user._id}`}
          className={({ isActive }) => (isActive ? "border-black dark:border-white border-b-2 font-medium w-[33%] text-center py-4 transition-all" :
            "w-[33%] text-center py-4 transition-all")}
        >Threads</NavLink>
        <NavLink to={`/profile/replies/${data?.user._id}`}
          className={({ isActive }) => (isActive ? "border-black dark:border-white border-b-2 font-medium w-[33%] text-center py-4 transition-all" :
            "w-[33%] text-center py-4 transition-all")}
        >Replies</NavLink>
        <NavLink to={`/profile/reposts/${data?.user._id}`}
          className={({ isActive }) => (isActive ? "border-black dark:border-white  border-b-2 font-medium w-[33%] text-center py-4 transition-all" :
            "w-[33%] text-center py-4 transition-all")}
        >Reposts</NavLink>
      </div>
      <Outlet />
      <div className='max-md:pb-10'></div>
      {openEditProfileModel && <EditProfile />}
    </div>
  )
}

export default ProfileLayout
