import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { GiFeather } from "react-icons/gi";
import { useLoginMutation, useMyInfoQuery, useSignupMutation } from "../redux/api";
import Loading from "../components/common/Loading";
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addMyInfo } from "../redux/features/service/serviceSlice";

export default function Register() {
  const navigate=useNavigate();
  const [loginUser, loginUserData] = useLoginMutation();
  const [signupUser,signupUserData] = useSignupMutation();
  const [login, setLogin] = useState(true);
  const toastOptions={
    autoClose:1000
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const onSubmit = async (data) => {
    if (login) {
     const response = await loginUser(data);
      localStorage.setItem('token',response.data.token);
      if (response.error) {
        toast.error(response.error.data.message,toastOptions)
      }else{
        navigate('/');
      }
    }else{
      const response = await signupUser(data);
      if(response.error){
        toast.error(response.error.data.message,toastOptions)
      }else{
        toast.success(response.data.message,toastOptions);
        setLogin(true);
      }
    }
  }

  return (
    <div className="relative md:bg-[url('/bg1.png')]  bg-[url('/bg2.png')] w-screen h-screen flex flex-col justify-center items-center font-kodeMono"
      style={{
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
      }}>
      <form onSubmit={handleSubmit(onSubmit)}
        className='transition-all duration-200 ease-in-out w-[80%] sm:w-[70%] md:w-[50%] lg:w-[25%] mt-20 max-md:mt-10 my-5 flex flex-col gap-3 px-5 py-4 border-2 rounded-md backdrop-blur-lg bg-slate-400/20 opacity-80 max-md:opacity-95'>
        <div className="text-center font-semibold text-xl">{login ? "Login" : "Signup"}</div>

        <div className="flex flex-col">
          <input placeholder="Enter your email" {...register("email", {
            required: "Email is required", pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Invalid email address",
            }
          })}
            className='w-[100%] p-1 my-3 rounded-md outline-none' />
          {errors.email && <span className="text-red-600">{errors.email.message}</span>}
        </div>

        {!login && <div className="flex flex-col">
          <input {...register("username", { required: "Username is required", minLength: { value: 4, message: "Username must be of atleast 4 characters" } })} placeholder="Enter your username"
            className='w-[100%] p-1 my-3 rounded-md outline-none' />
          {errors.username && <span className="text-red-600">{errors.username.message}</span>}
        </div>}

        <div className="flex flex-col">
          <input {...register("password", { required: "password is required" })} placeholder="Enter your password"
            className='w-[100%] p-1 my-3 rounded-md outline-none' />
          {errors.password && <span className="text-red-600">{errors.password.message}</span>}
        </div>

        {loginUserData.isLoading || signupUserData.isLoading ? <Loading /> : <input type="submit"
          className='p-1 bg-slate-700 cursor-pointer rounded-md text-white hover:bg-slate-500' />}
      </form>

      <div className='text-center  px-1 py-1'>{login ? "Don't have an account ? " : "Already have an account ? "} <span onClick={() => setLogin(!login)}
        className='text-blue-500 cursor-pointer hover:underline underline-offset-2'>{login ? "Signup" : "Login here"}</span></div>
      <div className="absolute bottom-1 md:left-1 flex justify-center items-center">
        <p className="hover:underline underline-offset-4 cursor-pointer">developed by Aayush </p>
        <GiFeather />
      </div>
      <ToastContainer/>
    </div>
  )
}