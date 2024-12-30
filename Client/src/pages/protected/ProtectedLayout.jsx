import { Outlet } from 'react-router-dom'
import Header from '../../components/common/Header'
import { ToastContainer } from 'react-toastify'


function ProtectedLayout() {
  return (
      <div
      className='transition-all duration-200 ease-in-out mx-auto flex flex-col max-w-[800px] min-w-[100%] overflow-hidden dark:bg-zinc-900 dark:text-slate-200'>
         <Header/>
         <Outlet/>
         <ToastContainer/>
      </div>
  )
}

export default ProtectedLayout
