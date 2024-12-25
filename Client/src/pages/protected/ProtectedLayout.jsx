import { Outlet } from 'react-router-dom'
import Header from '../../components/common/Header'


function ProtectedLayout() {
  return (
      <div
      className='mx-auto flex flex-col max-w-[800px] min-w-[100%] overflow-hidden'>
         <Header/>
         <Outlet/>
      </div>
  )
}

export default ProtectedLayout
