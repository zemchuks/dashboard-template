import React, { useEffect, useState } from 'react'
// import { EllipsisOutlined, SearchOutlined } from '@ant-design/icons';
// import { Table, Input, Button, Space, Tag, ConfigProvider, Popover } from 'antd';
// import Highlighter from 'react-highlight-words';
import { GrTransaction } from "react-icons/gr";
import { BsBox, BsFillPeopleFill } from "react-icons/bs";
import { FcBusinessman } from "react-icons/fc";
import { CiUser } from "react-icons/ci";
import { BankOutlined, SearchOutlined, StockOutlined, BellOutlined, MailOutlined, RiseOutlined } from "@ant-design/icons";

const Dashboard = () => {
    const [loading, setLoading] = useState(true); // State to track loading

    useEffect(() => {
        // Simulate loading for 2 seconds
        const timer = setTimeout(() => {
            setLoading(false);
        }, 2000);

        return () => clearTimeout(timer); // Cleanup the timer when component unmounts
    }, []);

    if (loading) {
        return (
            <div className="spinner-container">
                <div className="spinner"></div>
            </div>
        );
    }

    return (

        <main>
            <div className="header">
                <div className="left">
                    <h1>Dashboard</h1>
                    <ul className="breadcrumb">
                        <li><a href="#">Analytics </a></li>
                        /
                        <li><a href="#" className="active">Shop</a></li>
                    </ul>
                </div>
                <a href="#" className="flex text-center justify-center gap-3 px-3 bg-gray-300 p-2 rounded-md">
                    <i className='bx bx-cloud-download'></i>
                    <span className='text-black'>Download CSV</span>
                </a>
            </div>

            <ul className="insights">
                {/* <li>
                    <i className='bx bx-calendar-check'></i>
                    <span className="info">
                        <h3>
                            1,074
                        </h3>
                        <p>Paid Order</p>
                    </span>
                </li> */}
                <li>
                    <div className="bg-blue-200 p-6 rounded-md">
                        <GrTransaction className='text-blue-800 text-3xl' />
                    </div>

                    <span className="info">
                        <h3>  1,074 </h3>
                        <p>Transactions</p>
                    </span>
                </li>
                <li>
                    <div className="bg-[#FFF2C6] p-6 rounded-md">
                        <StockOutlined className='text-[#FBC02D] text-3xl' />
                    </div>

                    <span className="info">
                        <h3>  $3,500,459 </h3>
                        <p>Total Transactions Value</p>
                    </span>
                </li>
                {/* <li><i className='bx bx-show-alt'></i>
                    <span className="info">
                        <h3>
                            3,944
                        </h3>
                        <p>Site Visit</p>
                    </span>
                </li> */}
                <li>
                    <div className="bg-[#BBF7D0] p-6 rounded-md">
                        <BsBox className='text-[#388E3C] text-3xl' />
                    </div>

                    <span className="info">
                        <h3>  28 </h3>
                        <p>Available Products</p>
                    </span>
                </li>

                <li>
                    <div className="bg-[#FECDD3] p-6 rounded-md">
                        <BsFillPeopleFill className='text-[#D32F49] text-3xl' />
                    </div>

                    <span className="info">
                        <h3>  11 </h3>
                        <p>Registered Users</p>
                        <p className='text-blue-400'>See Users</p>
                    </span>
                </li>
                <li>
                    <div className="bg-gray-300 p-6 rounded-md">
                        <FcBusinessman className='text-4xl' />
                    </div>
                    <span className="info">
                        <h3>8</h3>
                        <p>Entities</p>
                    </span>
                </li>
                <li>
                    <div className="bg-gray-200 p-6 rounded-md">
                        <CiUser className='text-4xl' />
                    </div>
                    <span className="info">
                        <h3>8</h3>
                        <p>Onboarded Corporations</p>
                    </span>
                </li>
                <li>
                    <div className="bg-[#E0F0F0] p-6 rounded-md">
                        <BankOutlined className='text-4xl' />
                    </div>
                    <span className="info">
                        <h3> 3 </h3>
                        <p>Rating Agencies</p>
                    </span>
                </li>
            </ul>

            <div className="bottom-data">
                <div className="orders  mb-[8rem]">
                    <div className="header">
                        <i className='bx bx-receipt'></i>
                        <h3>Recent Transactions</h3>
                        <i className='bx bx-filter'></i>
                        <i className='bx bx-search'></i>
                    </div>
                    <table>
                        <thead>
                            <tr>
                                <th>User</th>
                                <th>Order Date</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    <img src="/assets/images/logo1.png" alt="profile" />
                                    <p>John Doe</p>
                                </td>
                                <td>14-08-2023</td>
                                <td><span className="status completed">Completed</span></td>
                            </tr>
                            <tr>
                                <td>
                                    <img src="/assets/images/logo1.png" alt="profile" />
                                    <p>John Doe</p>
                                </td>
                                <td>14-08-2023</td>
                                <td><span className="status pending">Pending</span></td>
                            </tr>
                            <tr>
                                <td>
                                    <img src="/assets/images/logo1.png" alt="profile" />
                                    <p>John Doe</p>
                                </td>
                                <td>14-08-2023</td>
                                <td><span className="status process">Processing</span></td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div className="reminders mb-[8rem]">
                    <div className="header">
                        <i className='bx bx-note'></i>
                        <h3>Pending Termsheets</h3>
                        <i className='bx bx-filter'></i>
                        <i className='bx bx-plus'></i>
                    </div>
                    <ul className="task-list">
                        <li className="completed">
                            <div className="task-title">
                                <i className='bx bx-check-circle'></i>
                                <p>Start Our Meeting</p>
                            </div>
                            <i className='bx bx-dots-vertical-rounded'></i>
                        </li>
                        <li className="completed">
                            <div className="task-title">
                                <i className='bx bx-check-circle'></i>
                                <p>Analyse Our Site</p>
                            </div>
                            <i className='bx bx-dots-vertical-rounded'></i>
                        </li>
                        <li className="not-completed">
                            <div className="task-title">
                                <i className='bx bx-x-circle'></i>
                                <p>Play Footbal</p>
                            </div>
                            <i className='bx bx-dots-vertical-rounded'></i>
                        </li>
                    </ul>
                </div>
            </div>

        </main>


    )
}

export default Dashboard 