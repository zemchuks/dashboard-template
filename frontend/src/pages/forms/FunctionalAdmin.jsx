import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons';
import React, { useEffect, useState } from 'react'
import STORAGEKEY from '../../config/APP/app.config';
import AuthStorage from '../../helper/AuthStorage';
import { admin } from '../../_Services/adminServices';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Checkbox } from 'antd';
import { LOGIN } from '../../redux/types';
import Spinner  from '../../helper/Spinner';
import { toast } from 'sonner';

const FunctionalAdmin = () => {
  const onChange = (e) => {
    console.log(`checked = ${e.target.checked}`);
  };
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
      // console.log("loginData", loginData);
      if (
        loginData.status === 200 &&
        loginData.message === "Login Successfully"
      ) {
        // toast.success(loginData.message);
        navigate("/Dashboard");
      }
    }
  }, [loginData, navigate]);

  const handleChange = (e) => {
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
      email: login.email,
      password: login.password,
    };

    setLoading(true); // Start loading spinner

    admin
      .adminLogin(data)
      .then((res) => {
        dispatch({
          type: LOGIN,
          payload: { res: res.data, is_loggedin: true },
        });

        if (res.data.status === 200 && res.data.data.token) {
          toast.success(res.data.message);
          navigate("/dashboard");
          AuthStorage.setStorageData(STORAGEKEY.token, res.data.data.token, true);
          AuthStorage.setStorageData(STORAGEKEY.roles, "admin", true);
          AuthStorage.setStorageData(STORAGEKEY.userId, res.data.data.id, true);
          AuthStorage.setStorageData(
            STORAGEKEY.userData,
            JSON.stringify(res.data.data),
            true
          );
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((error) => {
        console.log(error);
        toast.error("Login failed. Please try again.");
      })
      .finally(() => {
        setLoading(false); // Stop loading spinner
      });
  };


  return (
    <div>
      <>
        <div>
          <label className="block mb-2 text-sm font-semibold text-gray-600 ">Admin Email address <span className='text-red-500'>*</span></label>
          <input type="email"
            name="email" onChange={(e) => handleChange(e)} onKeyDown={handleKeyPress} placeholder="johnsnow@example.com" className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg focus:border-black dark:focus:border-blue-400 focus:ring-0 focus:outline-none focus:ring-opacity-40"
          />
          {loginFormError.email && (
            <span style={{ color: "#da251e", width: "100%", textAlign: "start" }}>
              {loginFormError.email}
            </span>
          )}
        </div>

        <div className='relative mt-4'>
          <label className="block mb-2 text-sm font-semibold text-gray-600 ">Admin Password <span className='text-red-500'>*</span></label>
          <input type={passwordVisible ? "text" : "password"} onChange={(e) => handleChange(e)} onKeyDown={handleKeyPress}
            name="password" placeholder="Enter your password" className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg focus:border-blue-400 dark:focus:border-blue-400 focus:ring-0 focus:outline-none  focus:ring-opacity-40" />
          {loginFormError.password && (
            <span style={{ color: "#da251e", width: "100%", textAlign: "start" }}>
              {loginFormError.password}
            </span>
          )}
          <span className="absolute right-0 top-3/4 -translate-y-1/2 text-lg mr-3 cursor-pointer" onClick={togglePasswordVisibility}>
            {passwordVisible ? (<EyeInvisibleOutlined />) : (<EyeOutlined />)}
          </span>
        </div>

        <div className='flex flex-row gap-3 mt-8 mb-8 justify-start items-center'>
          <div className='flex items-center'>
            <Checkbox onChange={onChange}>Keep me signed in</Checkbox>
          </div>
          <Link to='/admin-reset' className='font-semibold text-sm text-blue-400'> Forgot password?</Link>

        </div>


        <button onClick={(e) => Login(e)}
          className="flex items-center justify-center w-full px-6 py-4 mb-5 text-md font-semibold tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50">
          {!loading ? "Login" : <Spinner />}
        </button>
      </>

    </div>
  )
}

export default FunctionalAdmin