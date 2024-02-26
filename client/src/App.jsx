import { useContext, useState } from 'react'
import './App.css'
import { ThemeContext } from './context/ThemeContext'
import Navbar from './components/Navbar'
import { Outlet } from 'react-router-dom'

function App() {

  const { theme } = useContext(ThemeContext)

  return (
    <div data-theme={theme} className='bg-bgColor w-full border-2 flex flex-col gap-4'>
      <Navbar />
      <Outlet />

    </div>
  )
}

export default App
