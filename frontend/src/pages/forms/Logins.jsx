import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { Checkbox } from 'antd';


const Logins = () => {
    const navigate = useNavigate()
    const [selectedLogin, setSelectedLogin] = useState('staff'); // State to track which login is selected

    const onChange = (e) => {
        console.log(`checked = ${e.target.checked}`);
    };

    const handleLoginSelect = (loginType) => {
        setSelectedLogin(loginType);
    };

    return (
        <div className="left-slide flex items-center w-full max-w-3xl  mx-auto px-5 lg:px-12 lg:w-3/5">
            <div className="w-full">
                {/* <div className="flex justify-end p-3 ">
            <img src="../assets/images/lgo-red.png" className="w-auto h-[50px]" alt="logo img" srcset="" />
        </div> */}
                <h1 className="text-2xl mt-10 font-extrabold tracking-wider text-gray-800 capitalize">
                    Log into your account
                </h1>

                <div className="mt-6">
                    <h1 className="text-gray-400">Select type of account</h1>

                    <div className=" flex flex-row gap-5  mt-3 md:flex md:items-center md:-mx-2 group">
                        {/* Staff Button */}
                        <button onClick={() => handleLoginSelect('staff')}
                            className={`flex justify-center w-full px-6 py-3 rounded-lg md:w-auto md:mx-2 focus:outline-none ${selectedLogin === 'staff' ? 'bg-blue-500 text-white' : 'text-blue-500 border border-blue-500'}`}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>

                            <span className="mx-2">Staff Login</span>
                        </button>

                        {/* Admin Button */}
                        <button onClick={() => handleLoginSelect('admin')}
                            className={`flex justify-center w-full px-6 py-3 mt-4 rounded-lg md:mt-0 md:w-auto md:mx-2 focus:outline-none ${selectedLogin === 'admin' ? 'bg-blue-500 text-white' : 'text-blue-500 border border-blue-500'}`}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>

                            <span className="mx-2">Admin</span>
                        </button>
                    </div>

                    <p className="mt-4 text-gray-500">
                        {selectedLogin === 'admin'
                            ? "This is the admin login portal. If you are not an admin, you cannot have access. Please go to the staff login."
                            : "This is the staff login portal."}
                    </p>
                </div>



                <form className="grid grid-cols-1 gap-6 mt-8 md:grid-cols-1">

                    {/* <div>
                <label className="block mb-2 text-sm text-gray-600 ">First Name <span className='text-red-500'>*</span></label>
                <input type="text" placeholder="John" className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
            </div>

            <div>
                <label className="block mb-2 text-sm text-gray-600 ">Last name <span className='text-red-500'>*</span></label>
                <input type="text" placeholder="Snow" className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
            </div>

            <div>
                <label className="block mb-2 text-sm text-gray-600 ">Phone number <span className='text-red-500'>*</span></label>
                <input type="text" placeholder="XXX-XX-XXXX-XXX" className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
            </div> */}

                    {selectedLogin === 'staff' && (
                        <>
                            <div>
                                <label className="block mb-2 text-sm font-semibold text-gray-600 ">Email address <span className='text-red-500'>*</span></label>
                                <input type="email" placeholder="johnsnow@example.com" className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg focus:border-black dark:focus:border-blue-400 focus:ring-0 focus:outline-none focus:ring-opacity-40" />
                            </div>

                            <div>
                                <label className="block mb-2 text-sm font-semibold text-gray-600 ">Password <span className='text-red-500'>*</span></label>
                                <input type="password" placeholder="Enter your password" className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg focus:border-blue-400 dark:focus:border-blue-400 focus:ring-0 focus:outline-none  focus:ring-opacity-40" />
                            </div>
                        </>
                    )}


                    {selectedLogin === 'admin' && (
                        <>
                            <div>
                                <label className="block mb-2 text-sm font-semibold text-gray-600 ">Admin Email address <span className='text-red-500'>*</span></label>
                                <input type="email" placeholder="johnsnow@example.com" className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg focus:border-black dark:focus:border-blue-400 focus:ring-0 focus:outline-none focus:ring-opacity-40" />
                            </div>

                            <div>
                                <label className="block mb-2 text-sm font-semibold text-gray-600 ">Admin Password <span className='text-red-500'>*</span></label>
                                <input type="password" placeholder="Enter your password" className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg focus:border-blue-400 dark:focus:border-blue-400 focus:ring-0 focus:outline-none  focus:ring-opacity-40" />
                            </div>
                        </>
                    )}

                    {/* <div>
                <label className="block mb-2 text-sm text-gray-600 ">Confirm password <span className='text-red-500'>*</span></label>
                <input type="password" placeholder="Enter your password" className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
            </div> */}
                    <div className='flex flex-row gap-3 justify-start items-center'>
                        <div className='flex items-center'>
                            <Checkbox onChange={onChange}>Keep me signed in</Checkbox>
                        </div>
                        <Link to='/forgotpassword' className='font-semibold text-sm text-blue-400'> Forgot password?</Link>
                    </div>

                    <button onClick={() => navigate('/dashboard')} className="flex items-center justify-center w-full px-6 py-4 mb-5 text-md font-semibold tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50">
                        <span>Sign Up </span>

                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 rtl:-scale-x-100" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd"
                                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                clipRule="evenodd" />
                        </svg>
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Logins