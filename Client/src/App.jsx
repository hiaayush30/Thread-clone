import Header from './components/common/Header'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/protected/Home'
import Search from './pages/protected/Search'
import Error from './pages/Error'
import Register from './pages/Register'
import ProtectedLayout from './pages/protected/ProtectedLayout'
import ProfileLayout from './pages/protected/Profile/ProfileLayout'
import Threads from './pages/protected/Profile/Threads'
import Replies from './pages/protected/Profile/Replies'
import Reposts from './pages/protected/Profile/Reposts'
import SinglePost from './pages/protected/SinglePost'
import LandingPage from './pages/LandingPage'
import { useMyInfoQuery } from './redux/api'
import HeaderSkeleton from './components/skeletons/HeaderSkeleton'

// React Router renders parent routes and
// their nested child routes together. (using Outlet)

function App() {
  const {data,isLoading} = useMyInfoQuery();
  if(isLoading) return <div className='min-h-screen bg-zinc-900'><HeaderSkeleton/></div>
  return (
    <div className='min-h-screen'>
      <BrowserRouter>
        {data ? (<Routes>
          <Route path='/' element={<ProtectedLayout />}>
            <Route path='' element={<Home />} />
            <Route path='post/:id' element={<SinglePost />} />
            <Route path='search' element={<Search />} />
            <Route path='profile/' element={<ProfileLayout />}>
              <Route path='threads/:id' element={<Threads />} />
              <Route path='replies/:id' element={<Replies />} />
              <Route path='reposts/:id' element={<Reposts />} />
            </Route>
          </Route>
          <Route path='*' element={<Error />} />
        </Routes>) : (<Routes>
          <Route path='*' element={<Register/>} />
          {/* <Route path='*' element={<LandingPage/>} /> */}
        </Routes>)}
      </BrowserRouter>
    </div>
    // <Register/>
  )
}

export default App
