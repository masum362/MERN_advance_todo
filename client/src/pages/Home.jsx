import React, { useContext, useEffect, useState } from 'react'
import TodoForm from '../components/TodoForm'
import Todos from '../components/Todos'
import { ThemeContext } from '../context/ThemeContext';
import { useNavigate } from 'react-router-dom';
import { getAllTodo, searchTodo, getcompletedTodo, filterPriority } from '../utils/api';

const Home = () => {
    const { isOpen, setIsOpen, todos, setIsLoading } = useContext(ThemeContext);
    const [tabsTodo, setTabsTodo] = useState(null);
    const [completed, setCompleted] = useState(null);
    const [searchQuery, setSearchQuery] = useState("")

    const token = localStorage.getItem('token');

    const navigate = useNavigate();


    const handleCompletedTodo = async () => {
        try {
            setIsLoading(true);
            const result = await getcompletedTodo()
            setCompleted(result.data.todos);
            setTabsTodo(result.data.todos);
            setIsLoading(false);
        } catch (error) {
            console.log(error);
        }
    }


    const handleSearch = async () => {
        try {
            setIsLoading(true);
            const result = await searchTodo(searchQuery, token);
            setTabsTodo(result.data.todos);
            setSearchQuery("")
            setIsLoading(false);

        } catch (error) {
            console.log(error);
        }
    }

    const getTodos = async () => {
        try {
            setIsLoading(true);

            setTabsTodo(todos)
            setIsLoading(false);

        } catch (error) {
            console.log(error.message)
        }
    }

    const handleFiltering = async (value) => {
        try {
            const result = await filterPriority(value);
            console.log(result);
            setTabsTodo(result.data.todos);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if (!token) {
            navigate("/login");
        }
    }, [todos, token])






    return (
        <div className='flex flex-col gap-4 '>
            <div className='sm:w-[80%] m-auto lg:mt-20 flex  items-center justify-between gap-4 flex-col sm:flex-row'>
                <h1 className='px-4 py-2 bg-blueColor text-whiteColor w-40 rounded-lg text-xl text-center font-semibold cursor-pointer' onClick={() => setIsOpen(!isOpen)}>Add Todo</h1>
                <div>
                    <input type="text" name='searchQuery' id='searchQuery' placeholder='Search' className=' py-3 px-2 rounded' onChange={(e) => setSearchQuery(e.target.value)} value={searchQuery} />
                    <button className='btn bg-blueColor text-whiteColor' onClick={handleSearch}>Search</button>
                </div>
            </div>
            <div className='sm:w-[80%] m-auto flex flex-col sm:flex-row items-center justify-between gap-4'>
                <div className='flex items-center justify-center flex-col sm:flex-row gap-8'>
                    <div className='flex items-center justify-center py-4 gap-2 rounded-lg bg-primaryColor cursor-pointer w-52' onClick={getTodos}>
                        <h1 className='  text-xl font-bold' >Total </h1>
                        <div className="badge bg-secondaryColor">{todos?.length}</div>
                    </div>
                    <div className='flex flow-row items-center justify-center py-4 gap-2 rounded-lg bg-primaryColor cursor-pointer w-52' onClick={handleCompletedTodo}>
                        <h1 className='  text-xl font-bold' >Completed</h1>
                        <div className="badge bg-secondaryColor">{completed?.length}</div>
                    </div>
                </div>

                <div className='flex w-full sm:w-1/2 items-center justify-center gap-4 flex-col md:flex-row '>
                    <h1 className=' cursor-pointer text-xl capitalize'>filter with:</h1>
                    <select name="todoPriority" id="priority" className="select w-full md:max-w-xs bg-primaryColor" onChange={(e) => handleFiltering(e.target.value)} >
                        <option disabled selected >select the priority</option>
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                    </select>
                </div>
            </div>

            {
                isOpen && <TodoForm />
            }
            <Todos tabsTodo={tabsTodo} />
        </div>
    )
}

export default Home