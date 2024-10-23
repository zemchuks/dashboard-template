import { Checkbox } from 'antd'
import React from 'react'
import { Link } from 'react-router-dom'

const AdminForgotPassword = () => {
  return (
    <>
      
        <div className="left-slide flex items-center w-full max-w-3xl  mx-auto px-5 lg:px-12 lg:w-3/5">
          <div className="w-full">
            {/* <div className="flex justify-end p-3 ">
            <img src="../assets/images/lgo-red.png" className="w-auto h-[50px]" alt="logo img" srcset="" />
        </div> */}
            <h1 className="text-2xl mt-10 font-extrabold tracking-wider text-gray-800 capitalize">
              Change your password
            </h1>

            <div className="mt-6">
              <p className="mt-4 text-gray-500">
                Enter your email to change ypur pasword
              </p>
            </div>



            <form className="grid grid-cols-1 gap-6 mt-8 md:grid-cols-1">
              <div>
                <label className="block mb-2 text-sm font-semibold text-gray-600 ">Email address <span className='text-red-500'>*</span></label>
                <input type="email" placeholder="johnsnow@example.com" className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg focus:border-black dark:focus:border-blue-400 focus:ring-0 focus:outline-none focus:ring-opacity-40" />
              </div>

              <div className='flex flex-row gap-3 py-auto justify-start items-center'>
                {/* <div className='flex items-center'>
              <Checkbox >Keep me signed in</Checkbox>
            </div> */}
                <button onClick={() => navigate('/dashboard')} className="px-6 py-2 text-sm font-semibold text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50">
                  <span>Continue </span>
                </button>
                <Link to='/login' className='font-semibold text-sm text-blue-400 hover:underline hover:underline-offset-2'> Go to Login</Link>
              </div>

              {/* <button onClick={() => navigate('/dashboard')} className="px-4 py-4 mb-5 text-md font-semibold text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50">
            <span>Sign Up </span>
          </button> */}
            </form>
          </div>
        </div>
      
    </>
  )
}

export default AdminForgotPassword