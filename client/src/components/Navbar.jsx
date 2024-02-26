import React, { useContext, useEffect } from 'react'
import ToggleBtn from './ToggleBtn'
import { FaSignOutAlt } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { ThemeContext } from '../context/ThemeContext';


const Navbar = () => {
  const navigate = useNavigate();
  const {token , setToken} = useContext(ThemeContext) ;

  const handleLogOut = () => {
    setToken("")
    localStorage.removeItem("token");
    navigate("/login")
  }

  useEffect(() => {
    console.log("token changed")
  }, [token])


  return (
    <div className='py-4 md:px-12 bg-primaryColor flex items-center justify-between '>
      <div className='text-blueColor font-bold text-3xl px-4 
        '>
        <h1>TodoApp</h1>
      </div>
      <div className='px-4 flex items-center gap-8 justify-center'>
        <ToggleBtn />
        <FaSignOutAlt className='cursor-pointer' size={24} onClick={handleLogOut} />

      </div>
    </div>
  )
}

export default Navbar