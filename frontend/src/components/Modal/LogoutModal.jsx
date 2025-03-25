import { CloseOutlined } from '@ant-design/icons';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { LOGIN } from '../../redux/types';
import AuthStorage from '../../helper/AuthStorage';
// import Spinner from '../../helper/Spinner';

const LogoutModal = ({ isOpen, onClose, onConfirm }) => {
    const [isLoading, setIsLoading] = useState(false);

    const dispatch = useDispatch()
    const navigate = useNavigate();

    const Logout = (e) => {
        dispatch({
            type: LOGIN,
            payload: []
        })
        e.preventDefault();
        AuthStorage.deauthenticateUser()
        navigate('/signin');
    }

    // const handleConfirm = () => {
    //     setIsLoading(true);

    //     setTimeout(() => {
    //         onConfirm();
    //     }, 1000);
    // };

    if (!isOpen) return null;


    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 z-50 flex items-start h-screen justify-center bg-black bg-opacity-50">
            <div className="rounded-lg bg-white slide p-8 shadow-2xl mt-[6rem]">
                <div className='flex pb-2 items-center justify-between'>
                    <h2 className="text-lg font-bold">Logout from oramsys?</h2>

                    <CloseOutlined onClick={onClose} className='font-3xl' />
                </div>

                <p className="mt-2 text-sm text-gray-500">
                    This will log you out of this session. Are you sure you want to log out??
                </p>

                <div className="mt-4 flex gap-2">
                    {/* {isLoading ? (
                        <button disabled className="rounded bg-gray-50 px-4 py-2 text-sm font-medium text-gray-600 flex items-center opacity-75">
                           <Spinner />
                            Logging out...
                        </button>
                    ) : ( */}
                    <button type="button" onClick={(e) => Logout(e)} className="rounded bg-green-50 px-4 py-2 text-sm font-medium text-green-600">
                        Yes, I'm sure
                    </button>
                    {/* )} */}

                    <button type="button" onClick={onClose} className="rounded bg-gray-50 px-4 py-2 text-sm font-medium text-gray-600">
                        No, go back
                    </button>
                </div>
            </div>
        </div>
    )
}

export default LogoutModal