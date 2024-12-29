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
  const openAddPostModel = useSelector(state=>state.service.openAddPostModel);
  return (
    <div className='w-full h-full flex justify-around items-center text-black'>
      <NavLink to={'/'} className={({ isActive }) => (
        isActive ? "" : "text-slate-400 dark:text-zinc-400"
      )}>
        <IoHomeSharp title="home" size={32} className='cursor-pointer hover:scale-110 transition-all duration-300 ease-in-out' />
      </NavLink>
      <NavLink to={'/search'} className={({ isActive }) => (
        isActive ? "" : "text-slate-400 dark:text-zinc-400"
      )}>
        <IoSearch size={32} className='cursor-pointer hover:scale-110 transition-all duration-300 ease-in-out' />
      </NavLink>
      <div className="text-slate-400 dark:text-zinc-400">
        <FaEdit size={32}
          onClick={() => dispatch(setOpenAddPostModel(!openAddPostModel))}
          className='cursor-pointer hover:scale-110 transition-all duration-300 ease-in-out' />
      </div>
      <NavLink to={'/yo'} className={({ isActive }) => (
        isActive ? "" : "text-slate-400 dark:text-zinc-400"
      )}>
        <FaHeart size={32} className='cursor-pointer hover:scale-110 transition-all duration-300 ease-in-out' />
      </NavLink>
      <NavLink to={'/profile'} className={({ isActive }) => (
        isActive ? "" : "text-slate-400 dark:text-zinc-400"
      )}>
        <CgProfile size={32} className='cursor-pointer hover:scale-110 transition-all duration-300 ease-in-out' />
      </NavLink>
    </div>
  )
}

export default Navbar
