import { Outlet } from 'react-router-dom'
import Header from '../../components/common/Header'


function ProtectedLayout() {
  return (
      <div
      className='transition-all duration-200 ease-in-out mx-auto flex flex-col max-w-[800px] min-w-[100%] overflow-hidden dark:bg-zinc-800 dark:text-slate-200'>
         <Header/>
         <Outlet/>
      </div>
  )
}

export default ProtectedLayout
