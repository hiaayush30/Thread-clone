import { RiMenu3Fill } from "react-icons/ri";
import Navbar from './Navbar'
import { useNavigate } from 'react-router-dom';

function Header() {
  const navigate = useNavigate();
  return (
    <>
      <div className='max-md:hidden flex h-20 justify-around items-center sticky top-0 py-1 md:my-3'>
        <img src='/Threads-logo-white-bg.png'
          alt='logo'
          width={62}
          height={56}
          onClick={() => navigate('/')}
          className='cursor-pointer hover:scale-110 transition-all'
        />
        <div className='max-w-[95vw] flex justify-center rounded-lg w-[550px] bg-[#F0F8FF] z-20 h-20 text-white'
        >
          <Navbar />
          {/* seperate component as we have to use this in mobile format */}
        </div>
        <RiMenu3Fill size={32} className='cursor-pointer text-gray-500' />
      </div>
      {/* for less than medium screens */}
      <div className="md:hidden">
        <div className='flex h-20 justify-around items-center sticky top-0 py-1'>
          <img src='/Threads-logo-white-bg.png' 
            alt='logo'
            width={68}
            height={56}
            onClick={() => navigate('/')}
            className='cursor-pointer hover:scale-110 transition-all h-20 w-32 p-3'
          />
          <RiMenu3Fill size={30} className='cursor-pointer absolute right-5 text-gray-500' />
        </div>
        <div className="fixed bottom-0 bg-blue-100 right-0 left-0 p-1 z-20 pt-2 opacity-95">
          <Navbar />
        </div>
      </div>
    </>
  )
}

export default Header
