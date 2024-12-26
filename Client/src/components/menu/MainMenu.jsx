import React from 'react'
import { CiLight } from 'react-icons/ci';
import {useNavigate } from 'react-router-dom'

function MainMenu({setMenuOpen}) {
    const navigate=useNavigate();
  return (
    <div className='absolute border cursor-pointer right-0 bg-slate-100 rounded-md p-1'>
      <div className='px-2 py-2 hover:scale-105 flex items-center'>Theme<CiLight size={20}/></div>
      <div onClick={()=>{
        setMenuOpen(false);
        navigate('/profile')
      }}
      className='px-2 py-2 hover:scale-105  min-w-[100px]'>My Profile</div>
      <div className='px-2 py-2 hover:scale-105 '>Logout</div>
    </div>
  )
}

export default MainMenu
