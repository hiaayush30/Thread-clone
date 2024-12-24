import Header from './components/common/Header'
import Loading from './components/common/Loading'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/protected/Home'
import Search from './pages/protected/Search'
import Error from './pages/Error'
import Register from './pages/Register'

function App() {

  return (
    <div className='min-h-screen'>
    <BrowserRouter>
    <Header/>
      <Routes>
        <Route exact path='/' element={<h1>Protected</h1>}></Route>
        <Route exact path='' element={<h1>home</h1>}/>
        <Route exact path='post/:id' element={<h1>Posts</h1>}/>
        <Route exact path='' element={<h1>home</h1>}/>
        <Route exact path='' element={<h1>home</h1>}/>
      </Routes>
    </BrowserRouter>
    </div>
    // <Register/>
  )
}

export default App
