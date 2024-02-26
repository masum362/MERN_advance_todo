import React, { useContext, useEffect, useState } from 'react'
import { ThemeContext } from '../context/ThemeContext';
import Todo from './Todo';


const Todos = ({ tabsTodo }) => {


  const { todos } = useContext(ThemeContext)
  const { successMsg, setSuccessMsg } = useContext(ThemeContext)
  const { isLoadin, setIsLoading } = useContext(ThemeContext)


  useEffect(() => {
    setTimeout(() => {
      if (todos?.length > 0) {
        setIsLoading(false);
      }
    }, 2000);
  }, [todos])

  return (
    <>
      {isLoadin ? <div className='w-full h-screen flex items-center justify-center'><span className="loading loading-ring loading-lg item "></span></div> : <div className=' h-screen overflow-y-auto w-[80%] m-auto transition-all duration-300'>
        <p className='text-green-500'>{successMsg}</p>
        {tabsTodo ? tabsTodo?.map(todo => {
          return (
            <>
              <Todo todo={todo} todoId={todo._id} setSuccessMsg={setSuccessMsg} />
            </>

          )
        }) : todos?.map(todo => {
          return (
            <>
              <Todo todo={todo} todoId={todo._id} setSuccessMsg={setSuccessMsg} />
            </>

          )
        })}

      </div>}

    </>
  )
}

export default Todos