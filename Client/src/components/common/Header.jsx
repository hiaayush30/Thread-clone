import { RiMenu3Fill } from "react-icons/ri";
import Navbar from './Navbar'
import { useNavigate } from 'react-router-dom';
import MainMenu from "../menu/MainMenu";
import { useState } from "react";
import CreatePost from "../modals/CreatePost";
import { useDispatch, useSelector } from "react-redux";
import { setOpenMainMenu } from "../../redux/features/service/serviceSlice";
import { FaThreads } from "react-icons/fa6";

function Header() {
  const { openMainMenu,darkMode} = useSelector(state => state.service);
  const dispatch = useDispatch();
  const openAddPostModel = useSelector(state => state.service.openAddPostModel);
  const navigate = useNavigate();
  return (
    <>
      <div className='max-md:hidden flex h-20 justify-around items-center sticky top-0 py-1 md:my-3'>
        <FaThreads onClick={() => navigate('/')}
          className="w-12 h-12 cursor-pointer hover:scale-110 transition-all" />
        <div className='dark:bg-zinc-300 max-w-[95vw] flex justify-center rounded-lg w-[550px] bg-[#F0F8FF] z-20 h-20 text-white'
        >
          <Navbar />
          {/* seperate component as we have to use this in mobile format */}
        </div>
        <div className="relative">
          <RiMenu3Fill color={openMainMenu && darkMode ? 'white': openMainMenu && !darkMode && 'black'}
            onClick={() => dispatch(setOpenMainMenu(!openMainMenu))}
            size={32} className={` transition-all duration-300 cursor-pointer text-gray-500 ${openMainMenu && 'rotate-180'}`} />
          {openMainMenu && <MainMenu />}
        </div>
      </div>
      {/* for less than medium screens */}
      <div className="md:hidden">
        <div className='flex h-20 justify-around items-center sticky top-0 py-1'>
          <FaThreads onClick={() => navigate('/')}
            className="w-12 h-12 cursor-pointer hover:scale-110 transition-all" />
          <div className="absolute right-5">
            <RiMenu3Fill color={openMainMenu && darkMode ? 'white': openMainMenu && !darkMode && 'black'} onClick={() => dispatch(setOpenMainMenu(!openMainMenu))}
              size={32} className={` transition-all duration-300 cursor-pointer text-gray-500 ${openMainMenu && 'rotate-180'}`} />
            {openMainMenu && <MainMenu />}
          </div>
        </div>
        <div className="dark:bg-zinc-300 fixed bottom-0 bg-blue-100 right-0 left-0 p-1 z-20 pt-2 opacity-95">
          <Navbar />
        </div>
      </div>
      {openAddPostModel && <CreatePost />}
    </>
  )
}

export default Header
