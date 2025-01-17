import React from 'react'
import Navbar from './header/AuthHeader'
import Sidebar from './sidebar/sidebar'


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