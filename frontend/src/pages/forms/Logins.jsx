import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { Checkbox } from 'antd';
import { toast } from 'sonner';
import { IoHomeOutline } from 'react-icons/io5';
import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from 'react-redux';
import { loginAction } from "../../redux/actions/loginAction";
import  Spinner  from '../../helper/Spinner';
import { LOGIN } from '../../redux/types';
import AuthStorage from '../../helper/AuthStorage';
import STORAGEKEY from '../../config/APP/app.config';
import { admin } from '../../_Services/adminServices'
import UserLogin from './UserLogin';
import FunctionalAdmin from './FunctionalAdmin';


const Logins = () => {
    const [selectedLogin, setSelectedLogin] = useState('staff'); // State to track which login is selected

    const handleLoginSelect = (loginType) => {
        setSelectedLogin(loginType);
    };

    return (
        <>
            <div className="relative left-slide flex items-center md:max-w-2xl md:ml-8  mx-auto px-5 lg:px-12 md:w-3/5 ">
                <div className="absolute top-4 right-5 mx-auto flex justify-between items-center md:hidden">
                    <Link to='/' className="absolute -left-64 flex justify-between items-center gap-2 ">
                        <IoHomeOutline />
                        Home
                    </Link>
                    <img src="../../assets/images/lgo-red.png" className='w-28' alt="" />
                </div>
                <div className="w-full">

                    <h1 className="text-2xl mt-10 font-extrabold tracking-wider text-gray-800 capitalize">
                        Log into your account
                    </h1>

                    <div className="mt-2">

                        <h1 className="text-gray-400">Select type of account</h1>

                        <div className=" flex flex-row gap-5 flex-wrap mt-3 items-center md:-mx-2 group">
                            {/* Staff Button */}
                            <div>
                                <button onClick={() => handleLoginSelect('staff')}
                                    className={`flex justify-center w-full px-6 py-[7px] rounded-lg truncate md:w-auto md:mx-2 focus:outline-none ${selectedLogin === 'staff' ? 'bg-blue-500 text-white' : 'text-blue-500 border border-blue-500'}`}>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>

                                    <span className="mx-2">User</span>
                                </button>
                            </div>
                            <div>
                                <button onClick={() => handleLoginSelect('admin')}
                                    className={`flex justify-center w-full px-6 py-[7px] truncate rounded-lg md:mt-0 md:w-auto md:mx-2 focus:outline-none ${selectedLogin === 'admin' ? 'bg-blue-500 text-white' : 'text-blue-500 border border-blue-500'}`}>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>

                                    <span className="mx-2">Corporate Admin</span>
                                </button>
                            </div>

                            {/* Admin Button */}

                        </div>
                        <p className="mt-4 text-gray-500">
                            {selectedLogin === 'admin'
                                ? "This is the admin login portal. If you are not an admin, you cannot have access. Please click on the user login."
                                : "This is the user login portal."}
                        </p>
                    </div>

                    <form className="grid grid-cols-1 gap-6 mt-4 md:grid-cols-1">
                        {selectedLogin === 'staff' && (<UserLogin />)}

                        {selectedLogin === 'admin' && (<FunctionalAdmin />)}


                        {/* 
                        <div className='flex flex-row gap-3 justify-start items-center'>
                            <div className='flex items-center'>
                                <Checkbox onChange={onChange}>Keep me signed in</Checkbox>
                            </div>
                            {selectedLogin === 'admin' && <Link to='/admin-reset' className='font-semibold text-sm text-blue-400'> Forgot password?</Link>}
                            {selectedLogin === 'staff' && <Link to='/user-reset' className='font-semibold text-sm text-blue-400'> Forgot password?</Link>}

                        </div> */}





                    </form>
                </div>
            </div>



        </>
    )
}

export default Logins