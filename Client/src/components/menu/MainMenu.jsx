import React from 'react'

function MainMenu() {
  return (
    <div className='absolute border cursor-pointer right-0 bg-slate-100 rounded-md p-1'>
      <div className='px-2 py-2 hover:scale-105 '>Apperence</div>
      <div className='px-2 py-2 hover:scale-105  min-w-[100px]'>Edit Profile</div>
      <div className='px-2 py-2 hover:scale-105 '>Logout</div>
    </div>
  )
}

export default MainMenu
