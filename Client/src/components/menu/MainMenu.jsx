import React, { useEffect } from 'react'
import { CiLight } from 'react-icons/ci';
import { MdOutlineDarkMode } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { addMyInfo, setDarkMode, setOpenMainMenu } from '../../redux/features/service/serviceSlice';
import { useLogoutMutation } from '../../redux/api';
import { toast, ToastContainer } from 'react-toastify';

function MainMenu() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {darkMode,myInfo} = useSelector(state => state.service);
  const [logout,logoutData] = useLogoutMutation();
  const handleLogout= async()=>{
    dispatch(setOpenMainMenu(false))
    const response=await logout();
    console.log(response);
    if(!response.error){
      toast.success('logged out successfully!',{
        autoClose:1000,
        theme:darkMode ? 'dark':'light'
      });
      dispatch(addMyInfo(null));
      setTimeout(()=>{
        window.location.reload();
      },1000)
    }
  }
  useEffect(()=>{

  },[logoutData])
  return (
    <div className='absolute border cursor-pointer right-0 bg-slate-100 dark:bg-zinc-700 rounded-md p-1'>
      <div onClick={()=>(dispatch(setDarkMode(!darkMode)))}
        className='px-2 py-2 hover:scale-105 flex items-center'>
        Theme &nbsp; {darkMode ? <MdOutlineDarkMode size={20}/> : <CiLight size={20} />}</div>
      <div onClick={() => {
        dispatch(setOpenMainMenu(false))
        navigate(`/profile/threads/${myInfo._id}`)
      }}
        className='px-2 py-2 hover:scale-105  min-w-[100px]'>My Profile</div>
      <div onClick={handleLogout}
      className='px-2 py-2 hover:scale-105 '>Logout</div>
    </div>
  )
}

export default MainMenu
