import React, { useState } from 'react'
// import Dashboard from '../components/Dashboard'
import { Upload, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';


const Settings = () => {
    const [activeTab, setActiveTab] = useState("home");
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleModalToggle = () => {
        setIsModalOpen(!isModalOpen);
    };

    return (
        <>
            <div className="min-h-screen flex bg-white">
                {/* Sidebar */}
                {/* <div className="w-1/6 bg-white p-4 shadow-md">
                <button
                    className={`w-full p-2 text-left font-bold text-white ${activeTab === "home" ? "bg-blue-900" : "bg-gray-200 text-black"
                        }`}
                    onClick={() => setActiveTab("home")}
                >
                    Home
                </button>
                <button
                    className={`w-full p-2 mt-2 text-left font-bold text-white ${activeTab === "analytics"
                            ? "bg-gray-400"
                            : "bg-gray-200 text-black"
                        }`}
                    onClick={() => setActiveTab("analytics")}
                >
                    Analytics
                </button>
            </div> */}

                {/* Main Content */}
                <div className="w-full p-6 space-y-4">
                    {/* First Section: Total Flights */}
                    <div className="grid grid-cols-1  md:grid-cols-4 gap-4">
                        {/* First Column: Flights Stats */}
                        <div className="col-span-1 bg-blue-100 p-4  shadow-sm relative flex flex-col">
                            <ul className="space-y-2 text-sm font-semibold text-black">
                                <li>Total Transactions completed <span className="float-right text-black">425</span></li>
                                <li>Not signed termsheets <span className="float-right text-black">27</span></li>
                                <li>Signed termsheets <span className="float-right text-black">87</span></li>
                                <li>Approved Transactions <span className="float-right text-black">382</span></li>
                                <li>Organisations <span className="float-right text-black">30</span></li>
                            </ul>

                            {/* View All Flights Button */}
                            <button className="mt-4 py-2 px-4 bg-white shadow-md text-blue-600 rounded-md">
                                View Transactions
                            </button>

                            {/* Plane SVG */}
                            <div className="absolute inset-x-0 bottom-0 h-32 flex justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="hidden h-32 w-32 text-blue-500 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.239 14.504L12 16l5.52-1.54a2 2 0 002.181-1.672l.5-4A2 2 0 0017.19 7h-.943L9.5 4.27l-.439-1.76A1 1 0 008.07 2h-.99a1 1 0 00-.992 1.14l.239 2.39H4.01l-.33 1.33H7L8.9 9.25l-.75 1.13L3.68 13.4a2 2 0 00-1.441 1.104z" />
                                </svg>
                            </div>
                        </div>

                        {/* Second Column: Active Deals and Admin List */}
                        <div className="col-span-1 md:col-span-3 space-y-4">
                            {/* Active Deals */}
                            <div className="flex flex-wrap justify-between flex-col md:flex-row">
                                <div className={`bg-[#171B4A] text-white p-1 flex-1 min-w-[40%] flex items-center justify-center`}>
                                    <p className="text-lg">I will come back here</p>
                                </div>

                                {/* Right Section: Active Deals stacked two on each row */}
                                <div className="bg-[#F7F7F7] flex-1 p-1 grid grid-cols-2 gap-2">
                                    <div className="text-center bg-[#F7F7F7] cursor-pointer" onClick={handleModalToggle}>
                                        <p className="font-bold">00</p>
                                        <p className="text-sm">Tansactions Value</p>
                                    </div>
                                    <div className="text-center">
                                        <p className="font-bold">00</p>
                                        <p className="text-sm">Approved Deals (Volume)</p>
                                    </div>
                                    <div className="text-center">
                                        <p className="font-bold">₦0</p>
                                        <p className="text-sm">Sold Deals (Revenue)</p>
                                    </div>
                                    <div className="text-center">
                                        <p className="font-bold">00</p>
                                        <p className="text-sm">Closed Deals</p>
                                    </div>
                                </div>
                            </div>


                            {/* Trips and Visa */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="bg-[#F7F7F7] shadow-sm p-4 ">
                                    <h3 className="font-bold">PRODUCTS</h3>
                                    <hr className="my-2" />
                                    <ul className="space-y-2 text-sm">
                                        <li>Total Products <span className="float-right font-bold">15</span></li>
                                        <li>Metal Commodities <span className="float-right">00</span></li>
                                        <li>Energy Commodities <span className="float-right">03</span></li>
                                        <li>Soft commodity Commodity <span className="float-right">02</span></li>
                                        <li>Hard Commodity <span className="float-right">5</span></li>
                                    </ul>
                                </div>

                                <div className="bg-[#F7F7F7] shadow-sm p-4">
                                    <h3 className="font-bold">VISA (Latest 50)</h3>
                                    <hr className="my-2" />
                                    <ul className="space-y-2 text-sm">
                                        <li>Visa Enquiries <span className="float-right">00</span></li>
                                        <li>Consultations Done <span className="float-right">00</span></li>
                                        <li>Paid Visa <span className="float-right">00</span></li>
                                    </ul>
                                </div>
                            </div>

                            {/* Admin List */}
                            <div className="bg-[#E3E3E3] shadow-md p-2 rounded-md">
                                {/* <h3 className="font-bold text-lg">Admins</h3> */}
                                <div className="space-y-4 mt-4">
                                    {["Bruno Ezemba", "Jide Olanlokun", "Olamide Oladoyin"].map(
                                        (admin, index) => (
                                            <div key={index} className="bg-white flex items-center justify-between p-2 border rounded-md">
                                                <div className="flex items-center space-x-4">
                                                    <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                                                        <span className="text-xl">👤</span>
                                                    </div>
                                                    <div>
                                                        <p className="font-semibold">{admin}</p>
                                                        <p className="text-sm text-gray-500">ADMIN</p>
                                                    </div>
                                                </div>
                                                <div className={`w-3 h-3 rounded-full ${index === 0 ? "bg-red-500" : "bg-green-500"
                                                    }`}
                                                />
                                            </div>
                                        )
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

            {/* open Modal */}
            {isModalOpen && (
                <>
                    {/* Background Blur */}
                    <div className="fixed inset-0 bg-black/15 bg-opacity-50 backdrop-blur-[1px] z-40"></div>

                    {/* Centered Modal */}
                    <div className="fixed inset-0 flex items-center justify-center z-50">
                        <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6 space-y-4 relative">
                            {/* Modal Header */}
                            <div className="flex justify-between items-center">
                                <h2 className="text-lg font-bold">Modal Header</h2>
                                <button
                                    className="text-gray-500 hover:text-gray-800 text-lg"
                                    onClick={handleModalToggle}
                                >
                                    &times;
                                </button>
                            </div>

                            {/* Form Fields */}
                            <form className="space-y-4">
                                <input
                                    type="text"
                                    className="w-full p-2 border rounded-md"
                                    placeholder="Field 1"
                                />
                                <input
                                    type="text"
                                    className="w-full p-2 border rounded-md"
                                    placeholder="Field 2"
                                />
                                <input
                                    type="text"
                                    className="w-full p-2 border rounded-md"
                                    placeholder="Field 3"
                                />
                                <input
                                    type="text"
                                    className="w-full p-2 border rounded-md"
                                    placeholder="Field 4"
                                />
                                <input
                                    type="text"
                                    className="w-full p-2 border rounded-md"
                                    placeholder="Field 5"
                                />

                                {/* Upload Button */}
                                <Upload>
                                    <Button icon={<UploadOutlined />}>Upload</Button>
                                </Upload>

                                {/* Save and Cancel Buttons */}
                                <div className="flex justify-end space-x-4">
                                    <button
                                        type="button"
                                        className="py-2 px-4 bg-gray-300 rounded-md hover:bg-gray-400"
                                        onClick={handleModalToggle}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                                    >
                                        Save
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </>
            )}
        </>
    );
}

export default Settings