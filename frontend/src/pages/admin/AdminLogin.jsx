import React, { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import STORAGEKEY from "../../config/APP/app.config";
import { ApiPostNoAuth } from "../../helper/API/ApiData";
import AuthStorage from "../../helper/AuthStorage";
import { LOGIN } from "../../redux/types";
import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";
import { IoHomeOutline } from 'react-icons/io5';


const AdminLogin = () => {

    const [passwordVisible, setPasswordVisible] = useState(false);
    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    let emailReg = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const loginData = useSelector((state) => state.login.login);

    const [login, setLogin] = useState({});
    const [loginFormError, setLoginFormError] = useState({});
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (loginData) {
            console.log("loginData", loginData);
            if (
                loginData.status === 200 &&
                loginData.message === "Login Successfully"
            ) {
                // toast.success(loginData.message);
                navigate("/dashboard");
            }
        }
    }, [loginData, navigate]);

    const handelChange = (e) => {
        setLogin({ ...login, [e.target.name]: e.target.value });
    };
    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            Login(e); // Trigger the Login function
        }
    };

    const validation = () => {
        let param = false;
        let error = {};
        if (!login.email) {
            param = true;
            error.email = "Please enter email!";
        } else {
            if (!emailReg.test(login.email)) {
                param = true;
                error.email = "Please enter a valid email!";
            }
        }
        if (!login.password) {
            param = true;
            error.password = "Please enter password!";
        }
        setLoginFormError(error);
        return param;
    };
    const Login = async (e) => {
        e.preventDefault();
        if (validation()) {
            return;
        }
        let data = {
            user_name: login.email,
            password: login.password,
        };
        setLoading(true);

        await ApiPostNoAuth("superAdmin/login", data)
            .then((res) => {
                dispatch({
                    type: LOGIN,
                    payload: { res: res, is_loggedin: true },
                });
                if (res.status === 200 && res.data !== undefined) {
                    toast.success(res.message);
                    navigate("/dashboard");
                    AuthStorage.setStorageData(STORAGEKEY.token, res.data.token, true);
                    AuthStorage.setStorageData(STORAGEKEY.roles, "superAdmin", true);
                    AuthStorage.setStorageData(STORAGEKEY.userId, res.data.id, true);
                    AuthStorage.setStorageData(
                        STORAGEKEY.userData,
                        JSON.stringify(res.data),
                        true
                    );
                } else {
                    toast.error(res.message);
                }
            })
            .catch((error) => {
                console.log(error);
            });
        setLoading(false);
    };

    const handleLogin = () => {
        navigate('/dashboard')
        toast.success('Logged in successfully')
    }

    return (
        <div className="relative left-slide flex items-center md:max-w-2xl md:ml-8  mx-auto px-5 lg:px-12 ">
            <div className="absolute top-4 right-5 mx-auto flex justify-between items-center md:hidden">
                <Link to='/' className="absolute -left-64 flex justify-between items-center gap-2 ">
                    <IoHomeOutline />
                    Home
                </Link>
                <img src="../../assets/images/lgo-red.png" className='w-28' alt="" />
            </div>
            <div className="w-full">

                <h1 className="text-2xl mt-32 font-extrabold tracking-wider text-gray-800 capitalize">
                    Administrative Login
                </h1>

                <div className="mt-2">
                    <p className=" text-gray-500">
                        This is the oramsys administrative portal. if you are not an administrator you cannot have access. Please go to the client login
                    </p>
                </div>

                <form className="grid grid-cols-1 gap-6 mt-8 md:grid-cols-1">
                    <>
                        <div>
                            <label className="block mb-2 text-sm font-semibold text-gray-600 ">Email address <span className='text-red-500'>*</span></label>
                            <input
                                type="email"
                                onChange={(e) => handelChange(e)}
                                name='email'
                                onKeyDown={handleKeyPress}
                                placeholder="johnsnow@example.com"
                                className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg focus:border-black dark:focus:border-blue-400 focus:ring-0 focus:outline-none focus:ring-opacity-40" />
                            {loginFormError.email && (
                                <span style={{ color: "#da251e", width: "100%", textAlign: "start" }}>
                                    {loginFormError.email}
                                </span>
                            )}
                        </div>

                        <div className='relative'>
                            <label className="block mb-2 text-sm font-semibold text-gray-600 ">Password <span className='text-red-500'>*</span></label>
                            <input
                                type={passwordVisible ? "text" : "password"}
                                placeholder="Enter your password"
                                onChange={(e) => handelChange(e)}
                                onKeyDown={handleKeyPress}
                                name="password"
                                className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg focus:border-blue-400 dark:focus:border-blue-400 focus:ring-0 focus:outline-none  focus:ring-opacity-40" />
                            {loginFormError.password && (<span style={{ color: "#da251e", width: "100%", textAlign: "start" }}>
                                {loginFormError.password}
                            </span>
                            )}

                            <span className="absolute right-0 top-3/4 -translate-y-1/2 text-lg mr-3 cursor-pointer" onClick={togglePasswordVisibility}>
                                {passwordVisible ? (
                                    <EyeInvisibleOutlined />
                                ) : (
                                    <EyeOutlined />
                                )}
                            </span>
                        </div>
                    </>



                    {/* <div className='flex flex-row gap-3 justify-start items-center'>
                        <div className='flex items-center'>
                            <Checkbox onChange={onChange}>Keep me signed in</Checkbox>
                        </div>
                        <Link to='/forgotpassword' className='font-semibold text-sm text-blue-400'> Forgot password?</Link>
                    </div> */}

                    <button onClick={(e) => Login(e)} className="flex items-center justify-center w-full px-6 py-4 mb-5 text-md font-semibold tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50">
                        {/* <span>Login </span> */}
                        {!loading ? "Login" : ""}
                        {loading && (
                            <div class="flex items-center gap-2">
                                <span class="text-white text-sm">Logging in...</span>
                                <div class="w-5 h-5 rounded-full animate-spin border-4 border-solid border-white border-t-transparent"></div>

                            </div>
                        )}
                    </button>
                </form>
            </div>
        </div>
    )
}

export default AdminLogin