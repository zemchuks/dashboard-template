import React, { useCallback, useEffect, useState } from 'react';
import { Table, Dropdown as AntDropdown, Button as AntButton, Menu, Space, DatePicker, Select, Input } from 'antd';
import { DownOutlined, DownloadOutlined, EditOutlined, EllipsisOutlined, EyeOutlined, FormOutlined, SearchOutlined } from '@ant-design/icons';
import { BsCopy } from "react-icons/bs";
import dayjs from 'dayjs';
import 'dayjs/locale/en';
import { toast } from 'sonner';
import { GoWorkflow } from "react-icons/go";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import AuthStorage from '../../helper/AuthStorage';
import STORAGEKEY from '../../config/APP/app.config';
import { getAllTransaction } from "../../redux/actions/transactionDataAction";
import { ApiGet } from '../../helper/API/ApiData';
import { GET_TRANSACTION_BY_ID } from '../../redux/types';
import { Modal, TextInput, PasswordInput, Checkbox, Text, Button, Group } from '@mantine/core';
import { getRiskAssessment } from '../../redux/actions/riskAssessmentAction'
import ExcelModal from '../../components/Modal/ExcelModal'



const initialData = [
    {
        transactionId: 'TXN001',
        date: '2022-10-20',
        product: 'Product A',
        lender: 'Lender X',
        status: 'Pending',
    },
    {
        transactionId: 'TXN002',
        date: '2024-10-22',
        product: 'Product B',
        lender: 'Lender Y',
        status: 'Awaiting Approval',
    },
    {
        transactionId: 'TXN003',
        date: '2021-10-25',
        product: 'Product C',
        lender: 'Lender Z',
        status: 'Completed',
    },
    {
        transactionId: 'TXN004',
        date: '2021-10-25',
        product: 'Product C',
        lender: 'Lender Z',
        status: 'Completed',
    },
    {
        transactionId: 'TXN005',
        date: '2021-10-25',
        product: 'Product C',
        lender: 'Lender Z',
        status: 'Completed',
    },
    {
        transactionId: 'TXN006',
        date: '2022-10-25',
        product: 'Product C',
        lender: 'Lender Z',
        status: 'Completed',
    },
    {
        transactionId: 'TXN007',
        date: '2021-10-25',
        product: 'Product C',
        lender: 'Lender Z',
        status: 'Completed',
    },
    {
        transactionId: 'TXN008',
        date: '2021-10-25',
        product: 'Product C',
        lender: 'Lender Z',
        status: 'Completed',
    },
    {
        transactionId: 'TXN009',
        date: '2021-10-25',
        product: 'Product C',
        lender: 'Lender Z',
        status: 'Completed',
    },
    {
        transactionId: 'TXN010',
        date: '2021-10-25',
        product: 'Product C',
        lender: 'Lender Z',
        status: 'Completed',
    },
    {
        transactionId: 'TXN011',
        date: '2021-10-25',
        product: 'Product C',
        lender: 'Lender Z',
        status: 'Completed',
    },
    {
        transactionId: 'TXN012',
        date: '2021-10-25',
        product: 'Product C',
        lender: 'Lender Z',
        status: 'Completed',
    },
    {
        transactionId: 'TXN013',
        date: '2021-10-25',
        product: 'Touch this',
        lender: 'Muther fucker',
        status: 'Completed',
    },
];



const Transactions = () => {

    const dispatch = useDispatch();
    const [selected, setSelected] = useState("");
    const [showExcelModal, setShowExcelModal] = useState(false);
    const [sendId, setSendId] = useState();

    const navigate = useNavigate();
    const [showSubData, setShowSubData] = useState(false);
    const [transaction, setTransaction] = useState([]);
    const [transaction2, setTransaction2] = useState([]);
    // const [userName, setUserName] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(10);
    const [isPreview, setIsPreview] = useState(false)
    const [workFlowNotes, setWorkFlowNotes] = useState([])
    const [loading, setLoading] = useState(false);

    const getAlltransactionData = useSelector((state) => state.transactionData.getAllTransaction);

    const riskAssessment = useSelector((state) => state.riskAssessmentData.getRiskAssessment);
    // const handleCopy = (transactionId) => {
    //     navigator.clipboard.writeText(transactionId);
    //     toast.success('Transaction number copied to clipboard');
    // };
    // Column setup for the table with status color styling
    // const columns = [
    //     {
    //         title: 'Transaction ID',
    //         dataIndex: 'transactionId',
    //         key: 'transactionId',
    //         render: (transactionId) => (
    //             <div className="flex items-center gap-2">
    //                 {transactionId}
    //                 <BsCopy
    //                     onClick={() => handleCopy(transactionId)}
    //                     className="cursor-pointer"
    //                 />
    //             </div>
    //         ),
    //     },
    //     {
    //         title: 'Date',
    //         dataIndex: 'date',
    //         key: 'date',
    //     },
    //     {
    //         title: 'Product',
    //         dataIndex: 'product',
    //         key: 'product',
    //     },
    //     {
    //         title: 'Product',
    //         dataIndex: 'product',
    //         key: 'product',
    //     },
    //     {
    //         title: 'Product',
    //         dataIndex: 'product',
    //         key: 'product',
    //     },
    //     {
    //         title: 'Lender',
    //         dataIndex: 'lender',
    //         key: 'lender',
    //     },
    //     {
    //         title: 'Status',
    //         dataIndex: 'status',
    //         key: 'status',
    //         render: (status) => {
    //             let bgColor = '';
    //             let textColor = '';

    //             if (status === 'Pending') {
    //                 bgColor = 'bg-red-100';
    //                 textColor = 'text-red-400';
    //             } else if (status === 'Awaiting Approval') {
    //                 bgColor = 'bg-orange-100';
    //                 textColor = 'text-orange-600';
    //             } else if (status === 'Completed') {
    //                 bgColor = 'bg-green-100';
    //                 textColor = 'text-green-500';
    //             }

    //             return (
    //                 <span className={`${bgColor} ${textColor} px-2 py-1 w-auto h-auto inline-block text-center`}>
    //                     {status}
    //                 </span>
    //             );
    //         },
    //     },

    // ];
    useEffect(() => {
        let id =
            AuthStorage.getStorageData(STORAGEKEY.roles) !== "superAdmin"
                ? AuthStorage.getStorageData(STORAGEKEY.userId)
                : "all";
        dispatch(getAllTransaction(id));
    }, [dispatch]);

    const refreshPage = useCallback(() => {
        setLoading(true)
        if (getAlltransactionData?.data?.length > 0) {
            const transformedData = getAlltransactionData.data.map((item) => ({
                ...item,
                details: {
                    ...item.details,
                    shippingOptions: {
                        ...item.details.shippingOptions,
                        portOfOrigin: item.details.shippingOptions.portOfOrigin ?? item.details.shippingOptions.airbaseOfOrigin,
                        destinationPort: item.details.shippingOptions.destinationPort ?? item.details.shippingOptions.destinationAirbase,
                    },
                },
            }));
            setTransaction(transformedData);
            setTransaction2(transformedData);
        }
        setLoading(false)

    }, [getAlltransactionData]);

    useEffect(() => {
        dispatch(() => refreshPage());
        //eslint-disable-next-line
    }, [getAlltransactionData]);

    useEffect(() => {
        if (riskAssessment.status === 200 && selected) {
            // if (riskAssessment && riskAssessment.data && riskAssessment.data.transactionId   ) {
            navigate(`/risk-assessment?id=${selected}`);
            // }
        }
    }, [riskAssessment, selected, navigate]);

    const downloadTermSheet = (id, name) => {
        ApiGet(`transaction/termSheet/${id}`)
            .then((res) => {
                let data = res.data.data;
                if (name === "view") {
                    ViewRiskAssessment(data);
                } else if (name === "download") {
                    converBase64toBlob(data);
                }
            })
            .catch((e) => console.log(e));
    };


    const converBase64toBlob = (content, contentType = "application/pdf") => {
        const byteCharacters = atob(content);
        const byteArrays = [];
        for (let offset = 0; offset < byteCharacters.length; offset += 512) {
            const slice = byteCharacters.slice(offset, offset + 512);
            const byteNumbers = new Array(slice.length);
            for (let i = 0; i < slice.length; i++) {
                byteNumbers[i] = slice.charCodeAt(i);
            }
            const byteArray = new Uint8Array(byteNumbers);
            byteArrays.push(byteArray);
        }
        const blob = new Blob(byteArrays, { type: contentType });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "TermSheet.pdf";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    const ViewRiskAssessment = (contents) => {
        const linkSources = `data:application/pdf;base64,${contents}`;
        let pdfWindow = window.open("");
        pdfWindow.document.write(
            `<iframe width='100%' height='100%' src=${linkSources}></iframe>`
        );
    };

    const columns = [
        {
            title: "Date",
            dataIndex: "createdAt",
            key: "createdAt",
            render: (createdAt) =>
                new Date(createdAt).toLocaleDateString("en-US", DATE_OPTIONS),
            className: "hide-on-md",
        },
        {
            title: "Borrower",
            dataIndex: "borrower_Applicant",
            key: "borrower_Applicant",
            align: "center",
        },
        {
            title: "Lender",
            dataIndex: "lenders",
            key: "lenders",
            align: "center",
        },
        {
            title: "Contract Value",
            dataIndex: ["details", "contractDetails", "value"],
            key: "contractValue",
            align: "center",
            render: (value) => formateCurrencyValue(value),
        },
        {
            title: "Product",
            dataIndex: ["details", "productDetails", "name", "name"],
            key: "product",
            align: "center",
        },
        {
            title: "Termsheet",
            dataIndex: "termSheet",
            key: "termSheet",
            className: "hide-on-md",
            render: (termSheet, record) => {
                let bgColor = ''
                let textColor = ''

                if (termSheet === "Not Signed") {
                    bgColor = 'bg-red-100'
                    textColor = 'text-red-400'
                } else if (termSheet === 'Signed') {
                    bgColor = 'bg-green-100';
                    textColor = 'text-green-500';
                }
                return (
                    <span onClick={() => {
                        if (termSheet === "Not Signed") {
                            setShowExcelModal(true);
                            setSendId(record._id);
                        }
                    }} className={`${bgColor} ${textColor} cursor-pointer px-2 py-1 w-auto h-auto inline-block text-center`}>
                        {termSheet}
                        {record.termsheet === 'Signed' ? <DownloadOutlined className="" onClick={() => { downloadTermSheet(record._id) }} /> : null}
                    </span>
                )
            }
        },
        {
            title: "Approval Step",
            dataIndex: "workFlowSteps",
            key: "workflowStepName",
            render: (workFlowSteps) => {
                const step =
                    workFlowSteps && workFlowSteps.length > 0
                        ? workFlowSteps[workFlowSteps.length - 1]
                        : "In Progress";

                return (
                    <div className="flex items-center bg-orange-100 px-2 gap-1 py-[3px] rounded">
                        <GoWorkflow className="text-orange-600" />
                        <span className="text-orange-600 font-semibold">{step}</span>
                    </div>
                );
            },
            align: "center",
        },
        {
            title: "Actions",
            key: "actions",
            align: "center",
            render: (record) => (
                <AntDropdown placement="bottomRight"
                    overlay={
                        <Menu>
                            {AuthStorage.getStorageData(STORAGEKEY.roles) === "user" && (
                                <Menu.Item
                                    onClick={() => {
                                        navigate(`/edit-transactions?id=${record._id}`,
                                            {
                                                state: [{ type: record.type },
                                                { type: record?.details?.productDetails?.nature ? record.details.productDetails.nature : "" },
                                                { isView: false },
                                                ],
                                            });
                                    }}
                                >
                                    <EditOutlined className='pe-2' /> Edit
                                </Menu.Item>
                            )}


                            <Menu.Item
                                onClick={() => {
                                    navigate(`/edit-transactions?id=${record._id}`, {
                                        state: [
                                            { type: record.type },
                                            {
                                                type: record?.details?.productDetails?.nature
                                                    ? record.details.productDetails.nature
                                                    : "",
                                            },
                                            { isView: true },
                                        ],
                                    });
                                }}>
                                <EyeOutlined className='pe-2' /> Preview
                            </Menu.Item>

                            {AuthStorage.getStorageData(STORAGEKEY.roles) === "user" && (
                                <Menu.Item
                                    onClick={() => {
                                        dispatch(getRiskAssessment(record._id));
                                        setSelected(record._id);
                                    }}
                                >
                                    <FormOutlined className='pe-2' /> Risk Assessment
                                </Menu.Item>
                            )}
                            <Menu.Item
                                onClick={() => {
                                    record.termSheet === "Not Signed"
                                        ? downloadTermSheet(record._id, "view")
                                        : ViewRiskAssessment();
                                }}
                            >
                                <EyeOutlined className='pe-2' /> View Termsheet
                            </Menu.Item>
                            <Menu.Item
                                onClick={() => {
                                    setIsPreview(true)
                                    setWorkFlowNotes(record?.workflowstepNotes);
                                }}
                            >
                                <EyeOutlined className='pe-2' /> View Flowstep Notes
                            </Menu.Item>
                            <Menu.Item
                                onClick={() => {
                                    record.termSheet === "Not Signed"
                                        ? downloadTermSheet(record._id, "download")
                                        : converBase64toBlob(record.termSheetUrl);
                                }}
                            >
                                <DownloadOutlined className='pe-2' /> Download Termsheet
                            </Menu.Item>
                        </Menu>
                    }
                >
                    <AntButton>
                        <EllipsisOutlined />
                    </AntButton>
                </AntDropdown>
            ),
        },
    ];


    const [data, setData] = useState(initialData);
    const [filterDate, setFilterDate] = useState(null);
    const [statusFilter, setStatusFilter] = useState(null);
    const [search, setSearch] = useState('')

    const handleSearch = (e) => {
        const value = e.target.value;
        setSearch(value);

        if (value === '') {
            setTransaction2(transaction)
        } else {
            // Filter data based on search query
            const filteredData = transaction.filter((item) =>
                Object.values(item).some((field) =>
                    String(field).toLowerCase().includes(value.toLowerCase())
                )
            );
            setTransaction2(filteredData);
        }
    }


    const filterData = (date, status) => {
        const formattedDate = date ? date.format('YYYY-MM-DD') : null;
        setTransaction2(
            transaction.filter(item => {
                const dateMatch = formattedDate ? item.date === formattedDate : true;
                const statusMatch = status ? item.status === status : true;
                return dateMatch && statusMatch;
            })
        );
    };

    // Handle date filter
    const handleDateFilter = (date) => {
        setFilterDate(date);
        filterData(date, statusFilter);
    };

    // Reset filter
    const resetFilter = () => {
        setFilterDate(null);
        setStatusFilter(null);
        setTransaction2(transaction);
    };
    const statusMenuItems = [
        { label: 'Completed', key: 'Completed' },
        { label: 'Pending', key: 'Pending' },
        { label: 'Awaiting Approval', key: 'Awaiting Approval' },
    ];

    const handleStatusFilter = (status) => {
        setStatusFilter(status);
        filterData(filterDate, status);
    };

    const menuItems = [
        {
            key: "import",
            label: "Import",
            onClick: () => handleItemClick("Import"),
        },
        {
            key: "export",
            label: "Export",
            children: [
                {
                    key: "export-physical",
                    label: "Physical commodities",
                    onClick: () => handleRefresh(),
                },
                {
                    key: "export-non-physical",
                    label: "Non-physical commodities",
                    onClick: () => handleItemClick("Export"),
                },
            ],
        },
    ];


    const handleItemClick = (type) => {
        navigate("/edit-transactions", { state: [{ type }] });
    };

    const handleRefresh = () => {
        dispatch({
            type: GET_TRANSACTION_BY_ID,
            payload: {},
        });
        navigate("/edit-transactions", {
            state: [{ type: "Export" }, { type: "Physical" }],
        });
    };
    // const handleMenuClick = (e) => {
    //     if (e.key === 'import') {
    //         handleItemClick("Import")
    //     }
    //     else if (e.key === 'export-physical') {
    //         handleRefresh()
    //     } else if (e.key === 'export-non-physical') {
    //         handleItemClick("Export")
    //     }
    // };

    const formateCurrencyValue = (data) => {
        if (data) {
            let value = data.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            return value;
        } else {
            return data;
        }
    };

    // const menu = <Menu onClick={handleMenuClick} items={menuItems} />;
    const DATE_OPTIONS = {
        // weekday: "short",
        year: "numeric",
        month: "short",
        day: "numeric",
    };

    const indexOfLastTrans = currentPage * postsPerPage;
    const indexOfFirstTrans = indexOfLastTrans - postsPerPage;
    const currentTrans = transaction2?.slice(indexOfFirstTrans, indexOfLastTrans);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);


    const ViewNotes = () => {
        return (
            <Modal opened={isPreview} onClose={() => setIsPreview(false)} centered className="w-90" size="lg" title="Workflow Notes">


                {workFlowNotes.length > 0 ? (
                    <div>
                        {workFlowNotes.map((note, index) => (

                            <Group className="mb-1">
                                <div className="flex items-center"> <p>     {note?.username}  </p>
                                    <p className="text-muted mx-2">({note?.department})</p>
                                </div>
                                <div style={{ fontSize: 12 }}>  {note?.note} </div>
                            </Group>

                        ))}
                    </div>
                ) : (
                    <Text>No Notes Available</Text>
                )}

            </Modal>


        )
    }



    return (
        <main>
            <div className="w-auto px-auto ">
                <div className="text-[20px] font-semibold">
                    <h1>Transactions</h1>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-7 mt-5 md:flex-row   justify-between items-center ">

                    <div className="p-3 md:p-5 w-full bg-[#222548] text-white flex flex-col md:flex-row justify-between items-center">
                        <p className='md:items-start text-center text-[10px] md:text-[15px] text-white'>
                            Completed transactions
                        </p>
                        <p className='items-start text-2xl font-bold text-white'>
                            4
                        </p>
                    </div>
                    <div className="p-3 md:p-5 w-full bg-[#222548] text-white flex flex-col md:flex-row justify-between items-center">
                        <p className='md:items-start text-center text-[10px] md:text-[15px] text-white'>
                            Awaiting Approval
                        </p>
                        <p className='items-start text-2xl font-bold text-white'>
                            2
                        </p>
                    </div>

                    <div className="p-3 md:p-5 w-full bg-[#d2d0d0] flex flex-col md:flex-row justify-between items-center">
                        <p className='md:items-start text-center text-[10px] md:text-[15px] '>
                            Pending transactions
                        </p>
                        <p className='items-start text-2xl font-bold'>
                            0
                        </p>
                    </div>
                </div>

                <div className="mt-8">
                    <div className="flex flex-col md:flex-row md:justify-between items-center my-auto">
                        <div className="w-full mb-4 grid grid-cols-1 gap-4 sm:grid-cols-2 md:flex md:items-center md:gap-4">

                            {/* Dropdown Button */}
                            <AntDropdown menu={{ items: menuItems }} trigger={["click"]} >
                                <AntButton className="rounded-none p-4 w-full md:w-auto" type="primary">
                                    <Space>
                                        Add Transaction
                                        <DownOutlined />
                                    </Space>
                                </AntButton>
                            </AntDropdown>

                            {/* Date Filter AntButton */}
                            <DatePicker
                                onChange={handleDateFilter}
                                value={filterDate}
                                placeholder="--Filter Date--"
                                className="border rounded px-4 py-[6px] w-full md:w-auto"
                            />

                            {/* Status Filter */}
                            <AntDropdown menu={{ items: statusMenuItems, onClick: (e) => handleStatusFilter(e.key) }} trigger={['click']}>
                                <AntButton className="border bg-white rounded px-4 py-[17px] flex items-center space-x-2 w-full md:w-auto">
                                    <span>{statusFilter || '--Filter Status--'}</span>
                                    <DownOutlined />
                                </AntButton>
                            </AntDropdown>

                            {/* Reset AntButton */}
                            <AntButton className="rounded-none p-3 w-full md:w-auto" onClick={resetFilter} type="default">
                                Reset
                            </AntButton>
                        </div>

                        {/* SEARCH - Align to the right on medium screens */}
                        <div className="w-full md:w-auto mt-2 mb-6 md:mt-0 md:ml-auto md:my-auto">
                            <Input
                                placeholder="Search"
                                prefix={<SearchOutlined />}
                                value={search}
                                onChange={handleSearch}
                                className="p-[6px] w-full md:w-[300px]" // Dynamic width for small screens, fixed width for medium+
                            />
                        </div>
                    </div>







                    {/* Table */}
                    <Table
                        columns={columns}
                        dataSource={currentTrans}
                        // loading={loading}
                        loading={!currentTrans}
                        pagination={{
                            total: getAlltransactionData?.data?.length,
                            pageSize: postsPerPage,
                            current: currentPage,
                            onChange: paginate,
                        }}
                        className="shadow-lg z-0"
                        rowKey="transactionId"
                    />
                </div>
            </div>
            {ViewNotes()}
            {showExcelModal && (
                <ExcelModal
                    refreshpage={() => dispatch(() => refreshPage())}
                    isOpen={showExcelModal}
                    onClose={() => setShowExcelModal(false)}
                    getId={sendId}
                />
            )}
        </main>
    )
}

export default Transactions