import { IoHomeOutline, IoHomeSharp } from "react-icons/io5";
import { IoSearch } from "react-icons/io5";
import { FaEdit } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { Link, NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { setOpenAddPostModel } from "../../redux/features/service/serviceSlice";

function Navbar() {
  const dispatch = useDispatch();
  const {myInfo} = useSelector(state=>state.service);
  const openAddPostModel = useSelector(state=>state.service.openAddPostModel);
  return (
    <div className='w-full h-full flex justify-around items-center text-black'>
      <NavLink to={'/'} className={({ isActive }) => (
        isActive ? "p-1 dark:text-zinc-100 rounded-full dark:shadow-md dark:md:shadow-white" : "p-1 text-slate-400 dark:text-zinc-500"
      )}>
        <IoHomeSharp title="home" size={32} className='cursor-pointer hover:scale-110 transition-all duration-300 ease-in-out' />
      </NavLink>
      <NavLink to={'/search'} className={({ isActive }) => (
        isActive ? "p-1 dark:text-zinc-100 dark:shadow-md dark:md:shadow-white rounded-full" : "p-1 text-slate-400 dark:text-zinc-500"
      )}>
        <IoSearch size={32} className='cursor-pointer hover:scale-110 transition-all duration-300 ease-in-out' />
      </NavLink>
      <div className="text-slate-400">
        <FaEdit size={32}
          onClick={() => dispatch(setOpenAddPostModel(!openAddPostModel))}
          className='cursor-pointer hover:scale-110 dark:text-zinc-500 transition-all duration-300 ease-in-out' />
      </div>
      <NavLink to={'/yo'} className={({ isActive }) => (
        isActive ? "p-1 dark:text-zinc-100 dark:shadow-md dark:md:shadow-white rounded-full" : "p-1 text-slate-400 dark:text-zinc-500"
      )}>
        <FaHeart size={32} className='cursor-pointer hover:scale-110 transition-all duration-300 ease-in-out' />
      </NavLink>
      <NavLink to={`/profile/threads/${myInfo._id}`} className={({ isActive }) => (
        isActive ? "p-1 rounded-full dark:text-zinc-100 dark:shadow-md dark:md:shadow-white" : "p-1 text-slate-400 dark:text-zinc-500"
      )}>
        <CgProfile size={32} className='cursor-pointer hover:scale-110 transition-all duration-300 ease-in-out' />
      </NavLink>
    </div>
  )
}

export default Navbar
