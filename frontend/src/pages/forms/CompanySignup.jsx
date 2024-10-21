import React, { useState } from 'react'
// import Sequence from '../../components/sequenceAnimations'
import { useNavigate } from 'react-router-dom'

const CompanySignup = () => {
    const navigate = useNavigate()
    const [selectedLogin, setSelectedLogin] = useState(''); // State to track which login is selected

    const handleLoginSelect = (loginType) => {
        setSelectedLogin(loginType);
    };


    return (
        <section className="bg-white ">
            <div className="flex justify-center min-h-screen">
                {/* <div className="hidden bg-[#171B4A] text-white  lg:block lg:w-2/5" >
                    <div className="flex items-center-justify-center mx-auto"></div>
                </div> */}

                <div className="lg:grid lg:min-h-screen lg:max-w-[35%]">
                    <section className="relative flex h-32 items-end bg-gray-900 lg:col-span-5 lg:h-full xl:col-span-6">
                        {/* <img
                            alt=""
                            src="https://images.unsplash.com/photo-1617195737496-bc30194e3a19?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
                            className="absolute inset-0 h-full w-full object-cover opacity-80"
                        /> */}
                        <div className=" absolute hidden bg-[#171B4A] text-white  lg:block lg:w-2/5" >
                            <div className="flex items-center-justify-center mx-auto"></div>
                        </div>

                        <div className="hidden lg:relative lg:block lg:p-12">
                            <a className="block text-white" href="#">
                                {/* <span className="sr-only">Home</span>
                                <svg
                                    className="h-8 sm:h-10"
                                    viewBox="0 0 28 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M0.41 10.3847C1.14777 7.4194 2.85643 4.7861 5.2639 2.90424C7.6714 1.02234 10.6393 0 13.695 0C16.7507 0 19.7186 1.02234 22.1261 2.90424C24.5336 4.7861 26.2422 7.4194 26.98 10.3847H25.78C23.7557 10.3549 21.7729 10.9599 20.11 12.1147C20.014 12.1842 19.9138 12.2477 19.81 12.3047H19.67C19.5662 12.2477 19.466 12.1842 19.37 12.1147C17.6924 10.9866 15.7166 10.3841 13.695 10.3841C11.6734 10.3841 9.6976 10.9866 8.02 12.1147C7.924 12.1842 7.8238 12.2477 7.72 12.3047H7.58C7.4762 12.2477 7.376 12.1842 7.28 12.1147C5.6171 10.9599 3.6343 10.3549 1.61 10.3847H0.41ZM23.62 16.6547C24.236 16.175 24.9995 15.924 25.78 15.9447H27.39V12.7347H25.78C24.4052 12.7181 23.0619 13.146 21.95 13.9547C21.3243 14.416 20.5674 14.6649 19.79 14.6649C19.0126 14.6649 18.2557 14.416 17.63 13.9547C16.4899 13.1611 15.1341 12.7356 13.745 12.7356C12.3559 12.7356 11.0001 13.1611 9.86 13.9547C9.2343 14.416 8.4774 14.6649 7.7 14.6649C6.9226 14.6649 6.1657 14.416 5.54 13.9547C4.4144 13.1356 3.0518 12.7072 1.66 12.7347H0V15.9447H1.61C2.39051 15.924 3.154 16.175 3.77 16.6547C4.908 17.4489 6.2623 17.8747 7.65 17.8747C9.0377 17.8747 10.392 17.4489 11.53 16.6547C12.1468 16.1765 12.9097 15.9257 13.69 15.9447C14.4708 15.9223 15.2348 16.1735 15.85 16.6547C16.9901 17.4484 18.3459 17.8738 19.735 17.8738C21.1241 17.8738 22.4799 17.4484 23.62 16.6547ZM23.62 22.3947C24.236 21.915 24.9995 21.664 25.78 21.6847H27.39V18.4747H25.78C24.4052 18.4581 23.0619 18.886 21.95 19.6947C21.3243 20.156 20.5674 20.4049 19.79 20.4049C19.0126 20.4049 18.2557 20.156 17.63 19.6947C16.4899 18.9011 15.1341 18.4757 13.745 18.4757C12.3559 18.4757 11.0001 18.9011 9.86 19.6947C9.2343 20.156 8.4774 20.4049 7.7 20.4049C6.9226 20.4049 6.1657 20.156 5.54 19.6947C4.4144 18.8757 3.0518 18.4472 1.66 18.4747H0V21.6847H1.61C2.39051 21.664 3.154 21.915 3.77 22.3947C4.908 23.1889 6.2623 23.6147 7.65 23.6147C9.0377 23.6147 10.392 23.1889 11.53 22.3947C12.1468 21.9165 12.9097 21.6657 13.69 21.6847C14.4708 21.6623 15.2348 21.9135 15.85 22.3947C16.9901 23.1884 18.3459 23.6138 19.735 23.6138C21.1241 23.6138 22.4799 23.1884 23.62 22.3947Z"
                                        fill="currentColor"
                                    />
                                </svg> */}
                                <img src="../assets/images/logo.png" className="w-auto h-[50px]" alt="logo img" srcset="" />

                            </a>

                            <h2 className="mt-6 text-2xl font-bold text-white sm:text-3xl md:text-4xl">
                                Welcome to Oramsys
                            </h2>

                            <p className="mt-4 leading-relaxed text-white/90">
                                Access to a range of trade financing options tailored to
                                meet the specific needs of your business.
                            </p>
                        </div>
                    </section>
                </div>

                <div className="flex items-center w-full max-w-3xl  mx-auto px-5 lg:px-12 lg:w-3/5">
                    <div className="w-full">
                        {/* <div className="flex justify-end p-3 ">
                            <img src="../assets/images/lgo-red.png" className="w-auto h-[50px]" alt="logo img" srcset="" />
                        </div> */}
                        <h1 className="text-2xl mt-10 font-extrabold tracking-wider text-gray-800 capitalize">
                            Log into your account In
                        </h1>

                        <div className="mt-6">
                            <h1 className="text-gray-400">Select type of account</h1>

                            <div className="mt-3 md:flex md:items-center md:-mx-2 group">
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

                            <div>
                                <label className="block mb-2 text-sm font-semibold text-gray-600 ">Email address <span className='text-red-500'>*</span></label>
                                <input type="email" placeholder="johnsnow@example.com" className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg focus:border-black dark:focus:border-blue-400 focus:ring-0 focus:outline-none focus:ring-opacity-40" />
                            </div>

                            <div>
                                <label className="block mb-2 text-sm font-semibold text-gray-600 ">Password <span className='text-red-500'>*</span></label>
                                <input type="password" placeholder="Enter your password" className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg focus:border-blue-400 dark:focus:border-blue-400 focus:ring-0 focus:outline-none  focus:ring-opacity-40" />
                            </div>

                            {/* <div>
                                <label className="block mb-2 text-sm text-gray-600 ">Confirm password <span className='text-red-500'>*</span></label>
                                <input type="password" placeholder="Enter your password" className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
                            </div> */}

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
            </div>
        </section>
    )
}

export default CompanySignup