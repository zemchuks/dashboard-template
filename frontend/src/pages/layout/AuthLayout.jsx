import React from 'react'
import Navbar from '../../components/Navbar'
import Sidebar from '../../components/sidebar'

const AuthLayout = ({ children, ...props }) => {
    return (
        <div className="flex">

            <Sidebar />

            {/* <Sidebar /> */}
            <div >
                {/* <Navbar /> */}
                <div className="" >
                    {children}
                </div>
            </div>
        </div>
    )
}

export default AuthLayout