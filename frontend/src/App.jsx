import { useState } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Signin from './pages/Signin'
import Signup from './pages/Signup'
import Profile from './pages/Profile'
import Home from './pages/Home'
import Write from './pages/Write'
import Myposts from './pages/Myposts'
import EditPost from './pages/EditPage'
import { BrowserRouter } from 'react-router-dom'
import { Router } from 'react-router-dom'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home1 from './pages/Home'
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import Explore from './pages/Explore'
function App() {
  const [count, setCount] = useState(0)

  return (
    
    <BrowserRouter>
      <Routes>
        <Route path='/signup' element={<Signup />}></Route>
        <Route path='/signin' element={<Signin />}></Route>
        <Route path='/' element={<Home />}></Route>
        <Route path='/profile' element={<Profile />}></Route>
        <Route path='/write' element={<Write />}></Route>
        {/* <Route path='/explore' element={<Explore />}></Route> */}
        <Route path='/myposts' element={<Myposts />}></Route>
        <Route path='/edit' element={<EditPost />}></Route>
      </Routes>
    </BrowserRouter>
    


  )
}

export default App
