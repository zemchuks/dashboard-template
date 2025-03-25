import React, { useState } from 'react'
import { IoHomeOutline } from 'react-icons/io5'
import { Link, useNavigate } from 'react-router-dom'
import { admin } from '../../../_Services/adminServices';
import { toast } from 'sonner';
import Spinner  from '../../../helper/Spinner';
import { RiErrorWarningLine } from 'react-icons/ri';
import { emailRegex, passwordRegex } from "../../../helper/utils";
import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons';

const AdminForgetPassword = () => {
    const navigate = useNavigate();
    const [error, setError] = useState({})
    const [isSent, setIsSent] = useState(false);
    const [isVerified, setIsVerified] = useState(false);
    const [show, setShow] = useState(false);
    const [loading, setLoading] = useState(false);
    const [mail, setMail] = useState("");
    const [otp, setOtp] = useState("");
    const [password, setPassword] = useState("");
    const [confirPass, setConfirmPass] = useState("");
    const [passwordVisible, setPasswordVisible] = useState(false);
    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    const handleSendOTP = () => {
        if (emailRegex.test(mail) === false) {
            toast.error("Please enter a valid E-mail.");
            return;
        }
        if (mail.length > 0) {
            setLoading(true);
            admin
                .sendOtp({ email: mail })
                .then((res) => {
                    // console.log(res.data);
                    toast.success(res?.data?.message);
                    setIsSent(true);
                })
                .catch((error) => {
                    toast.error(error?.response?.data?.message);
                    // console.log(error?.response?.data?.message);
                })
                .finally(() => setLoading(false));
        }
    };

    const handleVerifyOTP = () => {
        setLoading(true);
        const data = {
            email: mail,
            otp: otp,
        };
        if (otp.length === 0) {
            toast.error("Please enter OTP!");
            setLoading(false);
            return;
        }
        // console.log(data);
        admin
            .verifyOtp(data)
            .then((res) => {
                // console.log(res.data);
                toast.success(res?.data?.message);
                setIsVerified(true);
            })
            .catch((error) => {
                toast.error(error?.response?.data?.message);
            })
            .finally(() => setLoading(false));
    };

    const handelChangePassword = () => {
        setLoading(true);
        if (passwordRegex.test(password) === false) {
            toast.warning("Password must contains 8 characters(A-Z,a-z,0-9,#@$%...)");
            setLoading(false);
            return false;
        }
        if (password !== confirPass) {
            toast.warning("Confirm Password must be same as Password!");
            setLoading(false);
            return false;
        }

        const data = {
            email: mail,
            password: password,
        };

        admin
            .setPassword(data)
            .then((res) => {
                // console.log(res.data);
                toast.success(res?.data?.message);
                navigate("/fa-login");
            })
            .catch((error) => {
                toast.error(error?.response?.data?.message);
            })
            .finally(() => setLoading(false));
    };

    return (

        <div className="relative left-slide flex items-center w-full md:max-w-2xl md:ml-8 mx-auto px-5 lg:px-12 md:w-3/5">
            <div className="absolute top-4 right-5 mx-auto flex justify-between items-center md:hidden">
                <Link to='/' className="absolute -left-64 flex justify-between items-center gap-2 ">
                    <IoHomeOutline />
                    Home
                </Link>
                <img src="../../assets/images/lgo-red.png" className='w-28' alt="" />
            </div>
            <div className="w-full">

                <h1 className="text-2xl font-extrabold tracking-wider text-gray-800 capitalize">
                    {isSent && !isVerified ? 'Verify OTP' : isVerified ? 'Set Password' : 'Reset Admin password'}
                </h1>

                {/* <div className="">
                    <p className="mt-1 text-gray-500">
                    {isSent && !isVerified ? 'Verify OTP' : isVerified ? 'Set Password' : 'Forget Password'}
                    </p>
                </div> */}

                <div className="grid grid-cols-1 gap-6 mt-6 md:grid-cols-1">
                    {!isSent && (
                        <>
                            <div>
                                <label className="block mb-2 text-sm font-semibold text-gray-600 ">Admin Email address <span className='text-red-500'>*</span></label>
                                <input type="email" name="email" onChange={(e) => setMail(e.target.value)}
                                    // onKeyDown={handleKeyPress}
                                    placeholder="johnsnow@example.com" className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg focus:border-black dark:focus:border-blue-400 focus:ring-0 focus:outline-none focus:ring-opacity-40" />
                            </div>

                            <div className='flex flex-row gap-6 py-auto justify-start items-center'>
                                <button onClick={() => handleSendOTP()} className="px-6 py-2 text-sm font-semibold text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring-opacity-50">
                                    <span>{!loading && 'Continue'} {loading && <Spinner />} </span>
                                </button>
                                <Link to='/signin' className='font-semibold text-sm text-blue-400 hover:underline hover:underline-offset-2'> Go to Login</Link>
                            </div>
                        </>
                    )}

                    {isSent && !isVerified && (
                        <>
                            <div>

                                <div className="w-full p-2 mb-5 bg-red-100 text-red-500 rounded-md flex items-center justify-center ">
                                    <RiErrorWarningLine className='text-2xl mr-5 justify-center' />
                                    Please do not refresh this page
                                </div>
                                <label className="block mb-2 text-sm font-semibold text-gray-600 ">Enter OTP <span className='text-red-500'>*</span></label>
                                <input type="number" name="otp" style={{ appearance: 'textfield' }} onChange={(e) => setOtp(e.target.value)}
                                    // onKeyDown={handleKeyPress}
                                    placeholder="" className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg focus:border-black dark:focus:border-blue-400 focus:ring-0 focus:outline-none focus:ring-opacity-40" />
                            </div>

                            <div className='flex flex-row gap-6 py-auto justify-start items-center'>
                                <button onClick={() => handleVerifyOTP()} className="px-6 py-2 text-sm font-semibold text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring-opacity-50">
                                    <span>{!loading && 'Continue'} {loading && <Spinner />} </span>
                                </button>
                                <Link to='/signin' className='font-semibold text-sm text-blue-400 hover:underline hover:underline-offset-2'> Go to Login</Link>
                            </div>
                        </>
                    )}

                    {isVerified && (
                        <div>
                            <div >
                                <div className='relative'>
                                    <label className="block mb-2 text-sm font-semibold text-gray-600 ">New password <span className='text-red-500'>*</span></label>
                                    <input type={passwordVisible ? "text" : "password"} onChange={(e) => setPassword(e.target.value)}
                                        name="password"
                                        placeholder="set password"
                                        className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg focus:border-blue-400 dark:focus:border-blue-400 focus:ring-0 focus:outline-none  focus:ring-opacity-40" />
                                    <span className="absolute right-0 top-3/4 -translate-y-1/2 text-lg mr-3 cursor-pointer" onClick={togglePasswordVisibility}>
                                        {passwordVisible ? (<EyeInvisibleOutlined />) : (<EyeOutlined />)}
                                    </span>
                                    {error && error?.password && <span style={{ color: 'red', marginTop: '5px' }}>{error.password}</span>}

                                </div>


                                <div className='mt-5 relative'>
                                    <label className="block mb-2 text-sm font-semibold text-gray-600 ">Confirm new password <span className='text-red-500'>*</span></label>
                                    <input type={passwordVisible ? "text" : "password"} onChange={(e) => setConfirmPass(e.target.value)}
                                        placeholder="confirm new password"
                                        className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg focus:border-blue-400 dark:focus:border-blue-400 focus:ring-0 focus:outline-none  focus:ring-opacity-40" />
                                    <span className="absolute right-0 top-3/4 -translate-y-1/2 text-lg mr-3 cursor-pointer" onClick={togglePasswordVisibility}>
                                        {passwordVisible ? (<EyeInvisibleOutlined />) : (<EyeOutlined />)}
                                    </span>
                                    {error && error?.confirPass && <span style={{ color: 'red' }}>{error.confirPass}</span>}

                                </div>

                                <div className='flex flex-row gap-6 py-auto mt-10 justify-start items-center'>
                                    <button onClick={() => handelChangePassword()} className="px-6 py-2 text-sm font-semibold text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring-opacity-50">
                                        <span>{!loading && 'Confirm and Login'} {loading && <Spinner />} </span>
                                    </button>
                                    <Link to='/signin' className='font-semibold text-sm text-blue-400 hover:underline hover:underline-offset-2'> Go to Login</Link>
                                </div>

                            </div>
                        </div>
                    )}

                </div>
            </div>
        </div>
    )
}

export default AdminForgetPassword