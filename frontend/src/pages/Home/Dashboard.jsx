import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { GrTransaction } from "react-icons/gr";
import { BsBox, BsFillPeopleFill } from "react-icons/bs";
import { FcBusinessman } from "react-icons/fc";
import { CiUser } from "react-icons/ci";
import { BankOutlined, SearchOutlined, StockOutlined, BellOutlined, MailOutlined, RiseOutlined } from "@ant-design/icons";
import DemoModal from '../../components/Modal/AddKeyParties';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import AuthStorage from '../../helper/AuthStorage';
import STORAGEKEY from '../../config/APP/app.config';
import { productGetAction } from "../../redux/actions/productAction";
import { getAllTransaction } from "../../redux/actions/transactionDataAction";
import { entityGetAction } from "../../redux/actions/entityAction";
import { userGetAction } from "../../redux/actions/userAction";
import { ratingAgenciesAction } from "../../redux/actions/ratingAgenciesAction";
import { adminGetAction } from "../../redux/actions/adminAction";
import { API } from "../../config/API/api.config";
import { ApiGet } from "../../helper/API/ApiData";
import { IoIosArrowRoundForward } from "react-icons/io";


const Dashboard = () => {
    const dispatch = useDispatch();
    const superAdminCard = [
        {
            title: "Transactions",
            img: "Transact",
            icon: GrTransaction,
            color: "text-blue-800",
            bg: "bg-blue-200",
            name: "transactions",
            status: "Completed",
        },
        {
            title: "Total Transactions Value",
            img: "sales",
            icon: StockOutlined,
            color: "text-[#FBC02D]",
            bg: "bg-[#FFF2C6]",
            name: "totalRev",
        },
        {
            title: "Available Products",
            img: "Product",
            icon: BsBox,
            color: "text-[#388E3C]",
            bg: "bg-[#BBF7D0]",
            name: "products",
        },
        {
            title: "Registered Users",
            img: "Users",
            icon: BsFillPeopleFill,
            color: "text-[#D32F49]",
            bg: "bg-red-100",
            name: "users",
        },
        {
            title: "Entities",
            img: "entity",
            icon: FcBusinessman,
            color: "bg-gray-300",
            bg: "bg-gray-300",
            name: "entities",
        },
        {
            title: "Corporations",
            img: "admins",
            icon: CiUser,
            color: "bg-gray-200",
            bg: "bg-gray-200",
            name: "corporations",
        },
        {
            title: "Rating Agencies",
            img: "rating",
            icon: BankOutlined,
            color: "bg-[#E0F0F0]",
            bg: "bg-[#E0F0F0] ",
            name: "rating",
        },
    ];
    const adminCard = [
        {
            title: "Transactions",
            img: "Transact",
            icon: GrTransaction,
            color: "text-blue-800",
            bg: "bg-blue-200",
            name: "transactions",
            status: "Completed",
        },
        {
            title: "Transactions in progress",
            img: "Transact",
            icon: GrTransaction,
            color: "text-red-600",
            bg: "bg-red-100",
            name: "inProgress",
            status: "Not Completed",
        },
        {
            title: "Transactions Value",
            img: "sales",
            icon: StockOutlined,
            color: "text-[#FBC02D]",
            bg: "bg-[#FFF2C6]",
            name: "totalRev",
        },

        {
            title: "Registered Users",
            img: "Users",
            icon: BsFillPeopleFill,
            color: "text-[#D32F49]",
            bg: "bg-red-100",
            name: "users",
        },

    ];
    const userCard = [
        {
            title: "Transactions",
            img: "Transact",
            icon: GrTransaction,
            color: "text-blue-800",
            bg: "bg-blue-200",
            name: "transactions",
            status: "Completed",
        },
        {
            title: "Transactions in progress",
            img: "Transact",
            icon: GrTransaction,
            color: "text-blue-800",
            name: "inProgress",
            bg: "bg-red-100",
            status: "Not Completed",
        },
        {
            title: "Your Transactions Value",
            img: "sales",
            icon: StockOutlined,
            color: "text-[#FBC02D]",
            bg: "bg-[#FFF2C6]",
            name: "totalRev",
        },

    ];

    const getAlltransactionData = useSelector((state) => state.transactionData.getAllTransaction);
    const productGetDatas = useSelector((state) => state.product.product);
    const getAllUsers = useSelector((state) => state.userData.getUserData);
    const getAllEntities = useSelector((state) => state.entityData.entity);
    const ratingAgenciesDatas = useSelector((state) => state.ratingAgenciesData?.ratingAgencies);
    const adminDatas = useSelector((state) => state.adminData?.getAdminData);
    const [currentUser, setcurrentUser] = useState(
        JSON.parse(localStorage.getItem("userData"))
    );
    const [worfFlowCount, setworkflowcount] = useState()

    const totalValue = useMemo(() => {
        if (!getAlltransactionData?.data) return "0";

        const sum = getAlltransactionData.data.reduce((acc, item) => {
            let value = item?.details?.contractDetails?.value;

            // Remove any non-numeric characters except the decimal point
            value = typeof value === "string" ? value.replace(/[^0-9.]/g, "") : value;

            return acc + (value ? parseFloat(value) : 0);
        }, 0);

        // Format the sum with commas
        return sum.toLocaleString();
    }, [getAlltransactionData]);

    const signedCount = [];
    const notSignedCount = [];
    //check to geet the number of signed transactions and un-signed transaction
    if (getAlltransactionData?.data) {
        getAlltransactionData.data.forEach((item) => {  // Use forEach instead of map
            if (item.termSheet === "Signed") {
                signedCount.push(item);
            } else {
                notSignedCount.push(item);
            }
        });
    }
    //Get data counts on everything
    const getCount = useCallback(
        (name) => {
            switch (name) {
                case "totalRev":
                    return totalValue;
                case "transactions":
                    return getAlltransactionData?.data?.length;
                case "products":
                    return productGetDatas?.data?.length;
                case "users":
                    return getAllUsers?.data?.length; // or the array of users like users.length;
                case "entities":
                    return getAllEntities?.data?.length;
                case "corporations":
                    return adminDatas?.data?.length;
                case "rating":
                    return ratingAgenciesDatas?.data?.length;

                default:
                    return;
            }
        },
        [
            getAllUsers,
            getAlltransactionData,
            productGetDatas,
            getAllEntities,
            adminDatas,
            ratingAgenciesDatas,
            totalValue
        ]
    );

    //get all transaction
    const Authsend = useCallback(() => {
        let id = AuthStorage.getStorageData(STORAGEKEY.roles) !== "superAdmin" ? AuthStorage.getStorageData(STORAGEKEY.userId) : "all";
        dispatch(getAllTransaction(id));
    }, [dispatch]);

    const prodAction = useCallback(() => {
        dispatch(productGetAction("all"));
    }, [dispatch]);

    const entityAction = useCallback(() => {
        dispatch(entityGetAction("all"));
    }, [dispatch]);
    const userAction = useCallback(() => {
        dispatch(userGetAction());
    }, [dispatch]);
    const agencyAction = useCallback(() => {
        dispatch(ratingAgenciesAction());
    }, [dispatch]);
    const adminAction = useCallback(() => {
        dispatch(adminGetAction());
    }, [dispatch]);

    useEffect(() => {
        dispatch(() => Authsend());
        dispatch(() => prodAction());
        dispatch(() => entityAction());
        dispatch(() => userAction());
        dispatch(() => agencyAction());
        dispatch(() => adminAction());
        // eslint-disable-next-line
        fetchData()
    }, []);

    const BaseURL = API;

    const fetchData = async () => {
        try {
            const response = await fetch(
                `${BaseURL}api/workflow/getuserFlow?assignedUser=${currentUser?.email}&addedBy=${currentUser?.admin?._id}`,
                {
                    method: 'GET',
                }
            );
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const result = await response.json();
            fetchTransactionCounts(result?.workflowDocument?.admin?.id, result?.workflowDocument?.department);

            // setworkFlow(result);
        } catch (err) {
            console.error('Error fetching data:', err);
            // setError(err.message);
        }
    };

    const fetchTransactionCounts = async (adminId, workflowStepName) => {
        const url = `${BaseURL}api/workFlow/counts?admin=${adminId}&workflowStepName=${encodeURIComponent(workflowStepName)}`;

        try {
            const response = await fetch(url, {
                method: 'GET', // Use GET method to fetch data
                headers: {
                    'Content-Type': 'application/json', // Set content type to JSON
                },
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }

            const data = await response.json(); // Parse the response body as JSON
            setworkflowcount(data?.counts)
            console.log('Counts:', data.counts); // Log the counts to the console
            return data.counts; // Return the counts
        } catch (error) {
            console.error('Error fetching counts:', error); // Handle errors
        }
    };



    const [loading, setLoading] = useState(true);
    // Modal function
    const [isModalVisible, setIsModalVisible] = useState(false);
    const openModal = () => setIsModalVisible(true)
    const closeModal = () => setIsModalVisible(false);

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

    const formateCurrencyValue = (data) => {
        if (data) {
            let value = data.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            return value;
        } else {
            return data;
        }
    };

    const DATE_OPTIONS = {
        weekday: "short",
        year: "numeric",
        month: "short",
        day: "numeric",
    };

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
                <Link onClick={openModal} className="flex text-center justify-center gap-3 px-3 bg-gray-300 p-1 rounded-md">
                    <i className='bx bx-cloud-download'></i>
                    <span className='text-black'>Download CSV</span>
                </Link>
            </div>

            <ul className="insights">

                {AuthStorage.getStorageData(STORAGEKEY.roles) === "superAdmin" &&
                    superAdminCard.map((card, i) => (
                        <li key={i}>
                            <div className={`${card.bg} p-4 rounded-md `}>
                                {/* <GrTransaction className='text-blue-800 text-3xl' /> */}
                                <card.icon className={` ${card.color} text-3xl`} />
                            </div>

                            <span className="info">
                                <h3> {getCount(card.name)} </h3>
                                <p>{card.title}</p>
                                <div>
                                    {card.status === "Completed" ? (
                                        <div className='flex text-xs justify-between gap-3 mt-2'>
                                            <div className='flex items-center gap-2'>
                                                <div className='bg-green-200 px-[3px] rounded-sm'>
                                                    <span className='text-green-700'>{signedCount.length}</span>
                                                </div>
                                                <span>completed</span>
                                            </div>

                                            <div className='flex items-center gap-2'>
                                                <div className='bg-red-100 px-[3px] rounded-sm'>
                                                    <span className='text-orange-500'>{notSignedCount.length}</span>
                                                </div>
                                                <span>In progress</span>
                                            </div>

                                        </div>
                                    ) : (
                                        <>
                                            <div>
                                                {card.title === "Available Products" ? (
                                                    <Link className='no-underline text-sm text-blue-400 flex items-center gap-3 mt-1' to='/products'>
                                                        View Products{" "} <IoIosArrowRoundForward />
                                                    </Link>
                                                ) : card.title === "Registered Users" ? (
                                                    <Link className='no-underline text-sm text-blue-400 flex items-center gap-3 mt-1' to='/users'>
                                                        View Users{" "} <IoIosArrowRoundForward />
                                                    </Link>
                                                ) : card.title === "Entities" ? (
                                                    <Link className='no-underline text-sm text-blue-400 flex items-center gap-3 mt-1' to='/entities'>
                                                        View Entities{" "} <IoIosArrowRoundForward />
                                                    </Link>
                                                ) : ("")}
                                            </div>
                                        </>
                                    )}
                                </div>

                            </span>

                        </li>
                    ))
                }
                {AuthStorage.getStorageData(STORAGEKEY.roles) === "admin" &&
                    adminCard.map((card, i) => (
                        <li key={i}>
                            <div className={`${card.bg} p-4 rounded-md `}>
                                {/* <GrTransaction className='text-blue-800 text-3xl' /> */}
                                <card.icon className={` ${card.color} text-3xl`} />
                            </div>

                            <span className="info">
                                {/* <h3> {getCount(card.name)} </h3> */}
                                <div>
                                    <p>{card.title}</p>

                                    {card.status === "Completed" ? (
                                        <div className='flex text-xs justify-between gap-3 mt-2'>
                                            <div className='flex items-center gap-2'>
                                                <span className='text-grey-700 text-2xl'>{signedCount.length}</span>
                                            </div>
                                        </div>
                                    ) : card.status === "Not Completed" ? (
                                        <div className='flex items-center gap-2'>
                                            <span className='text-grey-700 text-2xl'>{notSignedCount.length}</span>
                                        </div>
                                    ) : (
                                        <span className='text-md font-bold mb-0'>{getCount(card.name)}</span>
                                    )}
                                </div>



                                <div className='flex text-xs justify-between gap-3 mt-2'>
                                    {card.status === "Completed" ? (
                                        <div className='flex items-center gap-2'>
                                            <div className='bg-green-200 px-[5px] rounded-sm'>
                                                <span className='text-green-700 text=[5px]'>{signedCount.length}</span>
                                            </div>
                                            <span>completed</span>
                                        </div>
                                    ) : card.status === "Not Completed" ? (
                                        <div className='flex items-center gap-2'>
                                            <div className='bg-red-500 px-[5px] rounded-sm'>
                                                <span className='text-white text-[8px]'>{notSignedCount.length}</span>
                                            </div>
                                            <span>In progress</span>
                                        </div>
                                    ) : (
                                        <>
                                            {card.title === "Registered Users" ? (
                                                <Link className='no-underline text-sm text-blue-400 flex items-center gap-3 mt-1' to='/users'>
                                                    View Users{" "} <IoIosArrowRoundForward />
                                                </Link>
                                            ) : card.title === "Transactions Value" ? (
                                                <Link className='no-underline text-sm text-blue-400 flex items-center gap-3 mt-1' to='/transactions'>
                                                    View Transactions{" "} <IoIosArrowRoundForward />
                                                </Link>
                                            ) : ("")}
                                        </>
                                    )}
                                </div>
                            </span>

                        </li>
                    ))
                }

                {AuthStorage.getStorageData(STORAGEKEY.roles) === "user" &&
                    userCard.map((card, i) => (
                        <li key={i}>
                            <div className={`${card.bg} p-4 rounded-md `}>
                                {/* <GrTransaction className='text-blue-800 text-3xl' /> */}
                                <card.icon className={` ${card.color} text-3xl`} />
                            </div>

                            <span className="info">
                                {/* <h3> {getCount(card.name)} </h3> */}
                                <div>
                                    <p>{card.title}</p>

                                    {card.status === "Completed" ? (
                                        <div className='flex text-xs justify-between gap-3 mt-2'>
                                            <div className='flex items-center gap-2'>
                                                <span className='text-grey-700 text-2xl'>{signedCount.length}</span>
                                            </div>
                                        </div>
                                    ) : card.status === "Not Completed" ? (
                                        <div className='flex items-center gap-2'>
                                            <span className='text-grey-700 text-2xl'>{notSignedCount.length}</span>
                                        </div>
                                    ) : (
                                        <span className='text-md font-bold mb-0'>{getCount(card.name)}</span>
                                    )}
                                </div>



                                <div className='flex text-xs justify-between gap-3 mt-2'>
                                    {card.status === "Completed" ? (
                                        <div className='flex items-center gap-2'>
                                            <div className='bg-green-200 px-[5px] rounded-sm'>
                                                <span className='text-green-700 text=[5px]'>{signedCount.length}</span>
                                            </div>
                                            <span>completed</span>
                                        </div>
                                    ) : card.status === "Not Completed" ? (
                                        <div className='flex items-center gap-2'>
                                            <div className='bg-red-500 px-[5px] rounded-sm'>
                                                <span className='text-white text-[8px]'>{notSignedCount.length}</span>
                                            </div>
                                            <span>In progress</span>
                                        </div>
                                    ) : (
                                        <>
                                            {card.title === "Registered Users" ? (
                                                <Link className='no-underline text-sm text-blue-400 flex items-center gap-3 mt-1' to='/users'>
                                                    View Users{" "} <IoIosArrowRoundForward />
                                                </Link>
                                            ) : card.title === "Transactions Value" ? (
                                                <Link className='no-underline text-sm text-blue-400 flex items-center gap-3 mt-1' to='/transactions'>
                                                    View Transactions{" "} <IoIosArrowRoundForward />
                                                </Link>
                                            ) : ("")}
                                        </>
                                    )}
                                </div>
                            </span>

                        </li>
                    ))
                }

                {/* <li>
                    <div className="bg-blue-200 p-4 rounded-md">
                        <GrTransaction className='text-blue-800 text-3xl' />
                    </div>

                    <span className="info">
                        <h3>  1,074 </h3>
                        <p>Transactions</p>
                        <div className='flex text-xs justify-between gap-3 mt-2'>
                            <div className='flex items-center gap-2'>
                                <div className='bg-green-200 px-[3px] rounded-sm'>
                                    <span className='text-green-700'>0</span>
                                </div>
                                <span>completed</span>
                            </div>

                            <div className='flex items-center gap-2'>
                                <div className='bg-red-500 px-[3px] rounded-sm'>
                                    <span className='text-white'>0</span>
                                </div>
                                <span>In progress</span>
                            </div>

                        </div>
                    </span>

                </li> */}
                {/* <li>
                    <div className="bg-[#FFF2C6] p-4 rounded-md">
                        <StockOutlined className='text-[#FBC02D] text-3xl' />
                    </div>

                    <span className="info">
                        <h3>  $3,500,459 </h3>
                        <p>Total Transactions Value</p>
                    </span>
                </li>
                <li>
                    <div className="bg-[#BBF7D0] p-4 rounded-md">
                        <BsBox className='text-[#388E3C] text-3xl' />
                    </div>

                    <span className="info">
                        <h3>  28 </h3>
                        <p>Available Products</p>
                    </span>
                </li>

                <li>
                    <div className="bg-[#FECDD3] p-4 rounded-md">
                        <BsFillPeopleFill className='text-[#D32F49] text-3xl' />
                    </div>

                    <span className="info">
                        <h3>  11 </h3>
                        <p>Registered Users</p>
                        <p className='text-blue-400'>See Users</p>
                    </span>
                </li>
                <li>
                    <div className="bg-gray-300 p-4 rounded-md">
                        <FcBusinessman className='text-4xl' />
                    </div>
                    <span className="info">
                        <h3>8</h3>
                        <p>Entities</p>
                    </span>
                </li>
                <li>
                    <div className="bg-gray-200 p-4 rounded-md">
                        <CiUser className='text-4xl' />
                    </div>
                    <span className="info">
                        <h3>8</h3>
                        <p>Onboarded Corporations</p>
                    </span>
                </li>
                <li>
                    <div className="bg-[#E0F0F0] p-4 rounded-md">
                        <BankOutlined className='text-4xl' />
                    </div>
                    <span className="info">
                        <h3> 3 </h3>
                        <p>Rating Agencies</p>
                    </span>
                </li> */}
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
                                <th>Date Created</th>
                                <th>Product</th>
                                <th>Value</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {!getAlltransactionData ? (
                                <div className="text-center">
                                    {" "}
                                    No records were found
                                </div>
                            ) : (
                                getAlltransactionData &&
                                getAlltransactionData?.data?.map((data, i) => (
                                    <tr key={i}>
                                        <td> {new Date(data.createdAt).toLocaleDateString("en-US", DATE_OPTIONS)}</td>
                                        <td> {data.details?.productDetails?.name.name}</td>
                                        <td>
                                            {formateCurrencyValue(data?.details?.contractDetails?.value)}
                                        </td>

                                        <td><span className="status completed">Completed</span></td>
                                    </tr>
                                ))
                            )}


                        </tbody>
                    </table>
                </div>

                <div className="reminders mb-[8rem]">
                    <div className="header">
                        <i className='bx bx-note'></i>
                        <h3>Active users</h3>
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

            <DemoModal isOpen={isModalVisible} onClose={closeModal} />
        </main>


    )
}

export default Dashboard 