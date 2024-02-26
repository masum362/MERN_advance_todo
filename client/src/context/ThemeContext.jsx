// ThemeContext.js
import { createContext, useContext, useEffect, useState } from 'react';
import { getAllTodo } from '../utils/api';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('dark');
  const [isOpen, setIsOpen] = useState(false);
  const [successMsg, setSuccessMsg] = useState("")
  const [todos, setTodos] = useState([])
  const [token, setToken] = useState(localStorage.getItem("token") ? localStorage.getItem("token") : "");
const [isLoadng , setIsLoading] = useState(false)


  const getTodos = async () => {
    try {
      await getAllTodo(token).then(res => setTodos(res.data.todos)).catch(err => successMsg(err.message));
    } catch (error) {
      console.log(error.message)
    }
  }

  useEffect(() => {
    setTimeout(() => {
      setSuccessMsg("")
    }, 1000)
    getTodos();
    console.log(token)
    console.log(todos)
  }, [token, successMsg])


  return (
    <ThemeContext.Provider value={{ theme, setTheme, isOpen, setIsOpen, successMsg, setSuccessMsg, todos, setTodos, token, setToken ,isLoadng , setIsLoading}}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
