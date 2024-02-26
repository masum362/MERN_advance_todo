import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import registerImg from '../assets/undraw_my_password_re_ydq7.svg'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { base_url } from '../base_url';
import { Bounce, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { registerUser } from '../utils/api';


const Register = () => {

    const navigate = useNavigate();


    const formik = useFormik({
        initialValues: {
            name: "",
            username: "",
            email: "",
            password: "",
            confirmPassword: ""
        },
        validationSchema: Yup.object({
            name: Yup.string().required('Required'),
            username: Yup.string().required('Required'),
            email: Yup.string().required('Required'),
            password: Yup.string().required('Required').min(6,"Password must be at least 6 characters").max(20,"Password is too long"),
            confirmPassword: Yup.string().required('Required').oneOf([Yup.ref('password'), null], 'Passwords must match')
        }),
        onSubmit: async (values) => {
            try {
                const result = await registerUser(values);
                console.log(result);

                if (result.status === 201) {
                    toast.success(result.data.message, {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                        transition: Bounce,
                    });
                    formik.resetForm();
                    setTimeout(() => {
                        navigate("/login");
                    }, 2000);
                }
                else {
                    toast.error(result.data.message, {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                        transition: Bounce,
                    });
                }

            } catch (error) {
                toast.error(error, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    transition: Bounce,
                });
                console.log(error)
            }
        }
    });


    return (
        <>
            <div className=' flex justify-center items-center min-h-screen text-center p-4 lg:p-8'>
                <div className='w-full min-h-screen flex flex-col items-center justify-center gap-4 bg-primaryColor p-2 lg:px-24 xl:px-48'>
                    <h1 className='text-3xl lg:text-5xl font-bold '>Welcome Boss!</h1>
                    <p className='max-w-md text-center text-lg'>Simplify your workflow with Todo App.Get started for free.</p>
                    <form onSubmit={formik.handleSubmit} className='flex flex-col items-center justify-center gap-4'>
                        <div className="w-full">
                            <input type="text" id='name' name='name' placeholder='name' className='py-4 px-4 md:py-2 md:px-2 lg:py-4 lg:px-4  w-full rounded-full font-semibold border-2 border-bgColor' onChange={formik.handleChange} value={formik.values.name} />
                            {formik.touched.name && formik.errors.name ? (
                                <div className="text-dangerColor">
                                    <span className='text-start'>{formik.errors.name}</span>
                                </div>
                            ) : null}
                        </div>

                        <div className="w-full">
                            <input type="text" id='username' name='username' placeholder='username' className='py-4 px-4 md:py-2 md:px-2 lg:py-4 lg:px-4  w-full rounded-full font-semibold border-2 border-bgColor' onChange={formik.handleChange} value={formik.values.username} />
                            {formik.touched.username && formik.errors.username ? (
                                <div className="text-dangerColor">
                                    <span className='text-start'>{formik.errors.username}</span>
                                </div>
                            ) : null}
                        </div>

                        <div className="w-full">
                            <input type="email" id='email' name='email' placeholder='email' className='py-4 px-4 md:py-2 md:px-2 lg:py-4 lg:px-4  w-full rounded-full font-semibold border-2 border-bgColor' onChange={formik.handleChange} value={formik.values.email} />
                            {formik.touched.email && formik.errors.email ? (
                                <div className="text-dangerColor">
                                    <span className='text-start'>{formik.errors.email}</span>
                                </div>
                            ) : null}
                        </div>

                        <div className='flex items-center justify-between gap-4'>
                            <div className="w-full">
                                <input type="password" id='password' name='password' placeholder='password' className='py-4 px-4 md:py-2 md:px-2 lg:py-4 lg:px-4  w-full rounded-full font-semibold border-2 border-bgColor' onChange={formik.handleChange} value={formik.values.password} />
                                {formik.touched.password && formik.errors.password ? (
                                    <div className="text-dangerColor">
                                        <span className='text-start'>{formik.errors.password}</span>
                                    </div>
                                ) : null}
                            </div>
                            <div className="w-full">
                                <input type="password" id='confirmPassword' name='confirmPassword' placeholder='confirm password' className='py-4 px-4 md:py-2 md:px-2 lg:py-4 lg:px-4  w-full rounded-full font-semibold border-2 border-bgColor' onChange={formik.handleChange} value={formik.values.confirmPassword} />
                                {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
                                    <div className="text-dangerColor">
                                        <span className='text-start'>{formik.errors.confirmPassword}</span>
                                    </div>
                                ) : null}
                            </div>
                        </div>
                        <button type='submit' className="btn w-full h-16 md:h-12 lg:h-16 bg-blueColor text-whiteColor font-bold text-xl">Register</button>
                    </form>
                    <div className='w-full flex items-center justify-between gap-8 pt-4'>
                        <hr className='w-full' />
                        <hr className='w-full' />
                    </div>
                    <p className='my-4 md:my-2 lg:my-4'>already a member? <Link to={'/login'} className='text-blueColor '>Login now</Link></p>
                </div>
                <div className='w-full bg-[#86d0ee] min-h-screen rounded-sm hidden md:flex items-center justify-center'>
                    <img src={registerImg} alt="loginImg" />
                </div>

            </div>

            <ToastContainer />

        </>
    )
}

export default Register