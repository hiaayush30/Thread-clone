import { Stack } from '@mui/material'
import { RiMenu3Fill } from "react-icons/ri";
import Navbar from './Navbar'
import { useNavigate } from 'react-router-dom';

function Header() {
    const navigate=useNavigate();
  return (
    <Stack
    flexDirection={'row'}
    height={'52'}
    justifyContent={'space-around'}
    alignItems={'center'}
    position={'sticky'}
    top={'0'}
    py={'1'}
    >
       <img src='/Threads-logo-black-bg.webp'
       alt='logo'
       width={60}
       height={48}
       onClick={()=>navigate('/')}
       className='cursor-pointer hover:scale-110 transition-all'
       />
       <Stack 
       justifyContent={'center'} 
       width={'550px'} 
       bgcolor={'#4fb9ea'} 
       color={'white'} 
       zIndex={2} 
       height={96}
       >
        <Navbar/>  
        {/* seperate component as we have to use this in mobile format */}
       </Stack>
       <RiMenu3Fill size={32} className='cursor-pointer'/>
    </Stack>
  )
}

export default Header
