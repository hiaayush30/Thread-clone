import React from 'react'
import { CiLight } from 'react-icons/ci';
import { MdOutlineDarkMode } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { setDarkMode, setOpenMainMenu } from '../../redux/features/service/serviceSlice';

function MainMenu() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const darkMode = useSelector(state => state.service.darkMode);
  return (
    <div className='absolute border cursor-pointer right-0 bg-slate-100 dark:bg-zinc-700 rounded-md p-1'>
      <div onClick={()=>(dispatch(setDarkMode(!darkMode)))}
        className='px-2 py-2 hover:scale-105 flex items-center'>
        Theme &nbsp; {darkMode ? <MdOutlineDarkMode size={20}/> : <CiLight size={20} />}</div>
      <div onClick={() => {
        dispatch(setOpenMainMenu(false))
        navigate('/profile')
      }}
        className='px-2 py-2 hover:scale-105  min-w-[100px]'>My Profile</div>
      <div className='px-2 py-2 hover:scale-105 '>Logout</div>
    </div>
  )
}

export default MainMenu
