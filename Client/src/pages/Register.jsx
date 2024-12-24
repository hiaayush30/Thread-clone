import { Stack, Typography } from '@mui/material'
import React from 'react'

function Register() {
  return (
    <div
      className='w-screen h-screen flex flex-col justify-center items-center'
      style={{
        background: 'url("/register-bg.webp',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
      }}>
      <div className='mt-20 my-5 flex flex-col gap-3 p-5 border-2 rounded-md bg-slate-300 opacity-90'>
        <h3 className='font-semibold text-xl text-center'>Signup with email</h3>
        <input className='w-80 p-1 my-3 rounded-md outline-none' type='text' placeholder='Enter your email'></input>
        <input className='w-80 p-1 my-3 rounded-md outline-none' type='text' placeholder='Enter your username'></input>
        <input className='w-80 p-1 my-3 rounded-md outline-none' type='text' placeholder='Enter your password'></input>
        <button className='p-1 bg-slate-500 rounded-md text-white hover:bg-slate-400'>Sign Up</button>
      </div>
      <div className='text-center'>Already have an account? <span className='text-blue-500 cursor-pointer hover:underline underline-offset-2'>Login here</span></div>
    </div>
  )
}

export default Register
