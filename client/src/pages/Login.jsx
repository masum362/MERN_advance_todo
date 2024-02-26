import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import loginImg from '../assets/undraw_exciting_news_re_y1iw.svg'
import { useFormik } from 'formik';
import * as Yup from 'yup'
import axios from 'axios';
import { Bounce, ToastContainer, toast } from 'react-toastify';
import { base_url } from '../base_url';
import { loginUser } from '../utils/api';
import { ThemeContext } from '../context/ThemeContext';

const Login = () => {


  const navigate = useNavigate();
  const {token ,  setToken } = useContext(ThemeContext);

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: Yup.object({
      username: Yup.string().required('Required'),
      password: Yup.string().required('Required'),
    }),
    onSubmit: async (values) => {
      try {
        const result = await loginUser(values);
        console.log(result);
        setToken(result.data.token);
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
            navigate("/");
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
        console.log(error);
      }
    }
  });

console.log(token)


  return (
    <>
      <div className=' flex flex-row-reverse  justify-center min-h-screen p-4 lg:p-8'>
        <div className='w-full min-h-screen flex flex-col items-center justify-center gap-4 bg-primaryColor  p-2 lg:px-24 xl:px-48'>
          <h1 className='text-3xl lg:text-5xl font-bold '>Welcome Back!</h1>
          <p className='max-w-md text-center text-lg'>Simplify your workflow with Todo App.Get started for free.</p>
          <form onSubmit={formik.handleSubmit} className='w-full flex flex-col items-center justify-center gap-4'>
            <div className="w-full">
              <input type="text" id='username' placeholder='username' className='py-4 px-4 md:py-2 md:px-2 lg:py-4 lg:px-4 w-full rounded-full font-semibold border-2 border-bgColor' onChange={formik.handleChange} value={formik.values.username} />
              {formik.touched.username && formik.errors.username ? (
                <div className="text-dangerColor">
                  <span className='text-start'>{formik.errors.username}</span>
                </div>
              ) : null}
            </div>
            <div className="w-full">
              <input type="password" id='password' placeholder='password' className='py-4 px-4 md:py-2 md:px-2 lg:py-4 lg:px-4 w-full rounded-full font-semibold border-2 border-bgColor' onChange={formik.handleChange} value={formik.values.password} />
              {formik.touched.password && formik.errors.password ? (
                <div className="text-dangerColor">
                  <span className='text-start'>{formik.errors.password}</span>
                </div>
              ) : null}
            </div>
            <Link to="/forget-password" className='text-lg text-end w-full'>Forget password?</Link>
            <button type='submit' className="btn w-full h-16 bg-blueColor text-whiteColor font-bold text-xl">Login</button>
          </form>
          <div className='w-full flex items-center justify-between gap-8 pt-4'>
            <hr className='w-full' />
            <hr className='w-full' />
          </div>
          <p className='my-4'>Not a member? <Link to={'/register'} className='text-blueColor '>Register now</Link></p>
        </div>
        <div className='w-full bg-[#86d0ee] min-h-screen rounded-sm hidden md:flex items-center justify-center'>
          <img src={loginImg} alt="loginImg" />
        </div>
      </div>

      <ToastContainer />
    </>
  )
}

export default Login