import { Stack } from '@mui/material'
import { IoHomeSharp } from "react-icons/io5";
import { IoSearch } from "react-icons/io5";
import { FaEdit } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <Stack
    flexDirection={'row'}
    maxWidth={'100%'}
    justifyContent={'space-around'}
    alignItems={'center'}
    >
    <Link to={'/'}>
    <IoHomeSharp size={32} className='cursor-pointer'/>
    </Link>
    <Link to={'/search'}>
    <IoSearch size={32} className='cursor-pointer'/></Link>
    <FaEdit size={32} className='cursor-pointer'/>
    <FaHeart size={32} className='cursor-pointer'/>
    <CgProfile size={32} className='cursor-pointer'/>
    </Stack>
  )
}

export default Navbar
