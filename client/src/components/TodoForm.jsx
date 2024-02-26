import React, { useContext } from 'react'
import { TiDelete } from "react-icons/ti";
import { ThemeContext } from '../context/ThemeContext';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { addTodo, updateTodo } from '../utils/api';


const TodoForm = ({ todo, setIsUpdate }) => {

    const { successMsg, setSuccessMsg } = useContext(ThemeContext)
    const { isOpen, setIsOpen } = useContext(ThemeContext)


    const formik = useFormik({
        initialValues: {
            title: todo ? todo.title : "",
            description: todo ? todo.description : "",
            priority: todo ? todo.priority : "",
            status: todo ? todo.status : "",
            dueDate: todo ? todo.dueDate : "",
        },
        validationSchema: Yup.object({
            title: Yup.string().required("Required").max(100, "You can write only 100 characters in title"),
            description: Yup.string().required('Required'),
            priority: Yup.string().required('Required'),
            status: Yup.string().required('Required'),
            dueDate: Yup.string().required('Required'),
        }),
        onSubmit: async (values) => {
            console.log(values)


            if (todo) {
                try {
                    const response = await updateTodo(todo._id, values);
                    console.log(response)
                    setSuccessMsg("updated successfully")
                    formik.resetForm();
                    setIsOpen(false);
                    setIsUpdate(false);
                } catch (error) {
                    console.log(error)
                }
            } else {
                try {
                    const response = await addTodo(values);
                    console.log(response)
                    formik.resetForm();
                    setSuccessMsg("Successfully todo added")
                    setIsOpen(false);
                    setIsUpdate(false);
                } catch (error) {
                    console.log(error)
                }
            }



        },
    });






    return (

        <div className='absolute top-0 z-10 left-0 right-0 bottom-0 flex flex-col items-center justify-center h-screen w-full '>

            <div className='bg-secondaryColor rounded-lg lg:w-[50%] flex flex-col items-center justify-center p-4 '>
                <div className='flex justify-end w-full items-center px-4'>
                    <TiDelete size={40} className='cursor-pointer' onClick={() => {
                        setIsOpen(false)
                        setIsUpdate(false)
                    }} />

                </div>
                <form onSubmit={formik.handleSubmit} className='lg:w-[50%] py-6 flex flex-col items-center justify-center gap-8 transition-all duration-300'>

                    <div className='w-full flex flex-col items-start justify-center transition-all duration-300'>
                        <input type="text" placeholder="Type here" name='title' className="input input-bordered w-full max-w-xs bg-bgColor " value={formik.values.title} onChange={formik.handleChange} />

                        {formik.touched.title && formik.errors.title ? (
                            <div className="text-dangerColor">
                                <span className='text-start'>{formik.errors.title}</span>
                            </div>
                        ) : null}
                    </div>
                    <div className='w-full flex flex-col items-start justify-center transition-all duration-300'>
                        <textarea rows={5} type="text" placeholder="Type here" name='description' className=" input-bordered w-full max-w-xs bg-bgColor " value={formik.values.description} onChange={formik.handleChange} ></textarea>

                        {formik.touched.description && formik.errors.description ? (
                            <div className="text-dangerColor">
                                <span className='text-start'>{formik.errors.description}</span>
                            </div>
                        ) : null}
                    </div>

                    <div className='w-full transition-all duration-300'>
                        <select name="priority" id="priority" className="select w-full max-w-xs bg-bgColor" onChange={formik.handleChange} value={formik.values.priority}>
                            <option selected value={""}>select the priority</option>
                            <option value="low">Low</option>
                            <option value="medium">Medium</option>
                            <option value="high">High</option>
                        </select>

                        {formik.touched.priority && formik.errors.priority ? (
                            <div className="text-dangerColor">
                                <span className='text-start'>{formik.errors.priority}</span>
                            </div>
                        ) : null}
                    </div>


                    <div className='w-full flex flex-col items-start justify-center transition-all duration-300'>
                        <input type="date" placeholder="Type here" name='dueDate' className="input input-bordered w-full max-w-xs bg-bgColor " value={formik.values.dueDate} onChange={formik.handleChange} />

                        {formik.touched.dueDate && formik.errors.dueDate ? (
                            <div className="text-dangerColor">
                                <span className='text-start'>{formik.errors.dueDate}</span>
                            </div>
                        ) : null}
                    </div>

                    <div className='w-full transition-all duration-300'>
                        <select name="status" id="status" className="select w-full max-w-xs bg-bgColor" onChange={formik.handleChange} value={formik.values.status}>
                            <option selected value={""}>select the status</option>
                            <option value="incomplete">Incomplete</option>
                            <option value="completed">Completed</option>
                        </select>

                        {formik.touched.status && formik.errors.status ? (
                            <div className="text-dangerColor">
                                <span className='text-start'>{formik.errors.status}</span>
                            </div>
                        ) : null}
                    </div>
                    <button type="submit" className=' px-6 py-2 bg-blueColor text-whiteColor rounded-lg '>Add</button>
                </form>
            </div>
        </div>

    )
}

export default TodoForm