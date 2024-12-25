import { RiMenu3Fill } from "react-icons/ri";
import Navbar from './Navbar'
import { useNavigate } from 'react-router-dom';

function Header() {
  const navigate = useNavigate();
  return (
    <div className='flex h-20 justify-around items-center sticky top-0 py-1 md:my-3'>
      <img src='/Threads-logo-black-bg.webp'
        alt='logo'
        width={52}
        height={45}
        onClick={() => navigate('/')}
        className='max-md:hidden cursor-pointer hover:scale-110 transition-all'
      />
      <div className='max-w-[95vw] flex justify-center rounded-lg w-[550px] bg-[#F0F8FF] z-20 h-20 text-white'
      >
        <Navbar />
        {/* seperate component as we have to use this in mobile format */}
      </div>
      <RiMenu3Fill size={32} className='cursor-pointer max-md:hidden' />
    </div>
  )
}

export default Header
