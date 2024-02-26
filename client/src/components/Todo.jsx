import React, { useContext, useState } from 'react'
import { FaEdit, FaTrashAlt } from 'react-icons/fa'
import { ThemeContext } from '../context/ThemeContext';
import TodoForm from './TodoForm';
import { deleteTodo } from '../utils/api';

const Todo = ({ todo, setSuccessMsg }) => {

    console.log(todo.priority)
    let priorityClass = '';
    switch (todo.priority) {
        case 'low':
            priorityClass = 'bg-lowPriority';
            break;
        case 'medium':
            priorityClass = 'bg-mediumPriority';
            break;
        case 'high':
            priorityClass = 'bg-highPriority';
            break;
        default:
            priorityClass = ''; // Default background color
    }

    const { todos } = useContext(ThemeContext)
    const [isUpdate, setIsUpdate] = useState(false);

    console.log({ todo })
    const handleDelete = async (id) => {
        console.log(id)
        try {
            const result = await deleteTodo(id)
            setSuccessMsg(result.data.message)
            console.log()
        } catch (error) {
            console.log(error);
        }
    }


    return (
        <div key={todo.id} className={`flex items-center justify-between p-8 shadow-blueColor shadow-sm mt-1 ${priorityClass} transition-all duration-300`}>
            <div className='flex items-start gap-4'>
                <div>
                    <h1 className='text-xl max-w-md'> {todo.title} </h1>
                    <p>{todo.description?.slice(0, 50)}...</p>
                </div>
                <div className="badge bg-blueColor text-whiteColor">{todo.status}</div>

            </div>
            <div className='flex items-center justify-center gap-8'>
                <FaEdit className=' cursor-pointer' onClick={() => setIsUpdate(!isUpdate)} />
                <FaTrashAlt onClick={() => handleDelete(todo._id)} className=' cursor-pointer' />
            </div>
            {isUpdate && <TodoForm todo={todo} setIsUpdate={setIsUpdate} />}
        </div>
    )
}

export default Todo