import React, { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Navbar from '../header/AuthHeader';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'; // Import default styles
import LogoutModal from '../../components/Modal/LogoutModal';
import { LiaPeopleCarrySolid } from "react-icons/lia";
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import { PiBuildingOfficeLight } from "react-icons/pi";
import { TbUsersPlus } from "react-icons/tb";
import { LiaFileInvoiceDollarSolid } from "react-icons/lia";
import { HiOutlineUsers } from "react-icons/hi2";
import { BsBoxSeam } from "react-icons/bs";
import { Menu } from 'antd';
import { FaFileAlt } from "react-icons/fa";
import { GoWorkflow } from "react-icons/go";
import { ApiGet } from "../../helper/API/ApiData";
import AuthStorage from '../../helper/AuthStorage'
import STORAGEKEY from '../../config/APP/app.config'
import '../../App.css'




function Sidebar({ children, ...props }) {
  const [isSidebarClosed, setSidebarClosed] = useState(false);
  const [theme, setTheme] = useState(false);
  const menuRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate()

  const [userData, setUserData] = useState("");
  const [activeItem, setActiveItem] = useState("Dashboard");
  const [logo, setLogo] = useState("");

  const adminId = AuthStorage.getStorageData(STORAGEKEY.roles) === "admin" ? AuthStorage.getStorageData("userId") : "";


  const navbarDataForSuperAdmin = [
    {
      img: 'bx bxs-dashboard',
      text: "Dashboard",
      path: "dashboard",
    },
    {
      img: MdOutlineAdminPanelSettings,
      text: "Administration",
      path: "",
      subItem: [
        {
          img: 'bx bxs-dashboard',
          text: "Master Data",
          path: "",
          subData: [
            {
              img: FaFileAlt,
              text: 'Countries',
              path: "countries",
            },
            {
              img: FaFileAlt,
              text: 'Ports',
              path: "ports",
            },
            {
              img: FaFileAlt,
              text: 'Airports',
              path: "airports",
            },
          ]
        }
      ]
    },
    {
      img: LiaPeopleCarrySolid,
      text: 'Entity Roles',
      path: "entityRole",
    },
    {
      img: TbUsersPlus,
      text: 'Entities',
      path: "entities",
    },
    {
      img: HiOutlineUsers,
      text: 'Users',
      path: "users",
    },
    {
      img: BsBoxSeam,
      text: 'Products',
      path: "products",
    },
    {
      img: PiBuildingOfficeLight,
      text: 'Corporations',
      path: "admins",
    },
    {
      img: LiaFileInvoiceDollarSolid,
      text: 'Transactions',
      path: "transactions",
    },
    {
      img: "bx bx-cog",
      text: 'Settings',
      path: "settings",
    },
  ]

  const navbarDataForAdmin = [

    {
      img: 'bx bxs-dashboard',
      text: "Dashboard",
      path: "dashboard",
    },
    {
      img: PiBuildingOfficeLight,
      text: 'Profile',
      path: "admins",
    },
    {
      img: HiOutlineUsers,
      text: 'Users',
      path: "users",
    },
    {
      img: LiaFileInvoiceDollarSolid,
      text: 'Transactions',
      path: "transactions",
    },
    {
      img: GoWorkflow,
      text: 'WorkFlow',
      path: "workflow",
    },

  ]

  const navbarDataForUser = [
    {
      img: 'bx bxs-dashboard',
      text: "Dashboard",
      path: "dashboard",
    },
    {
      img: TbUsersPlus,
      text: 'Entities',
      path: "entities",
    },
    {
      img: LiaFileInvoiceDollarSolid,
      text: 'Transactions',
      path: "transactions",
    },
  ]

  // let navbarData = [];


  // if (AuthStorage.getStorageData(STORAGEKEY.roles) === "user") {
  //   navbarData = navbarDataForUser;
  // } else if (AuthStorage.getStorageData(STORAGEKEY.roles) === "admin") {
  //   navbarData = navbarDataForAdmin;
  // } else if (AuthStorage.getStorageData(STORAGEKEY.roles) === "superAdmin") {
  //   navbarData = navbarDataForSuperAdmin;
  // }
  const getNavbarData = () => {
    const role = AuthStorage.getStorageData(STORAGEKEY.roles);
    if (role === "user") return navbarDataForUser;
    if (role === "admin") return navbarDataForAdmin;
    if (role === "superAdmin") return navbarDataForSuperAdmin;
    return []; // Default to an empty array if no role is matched
  };

  const navbarData = getNavbarData();

  const getStorage = AuthStorage.getStorageData(STORAGEKEY.userData);

  useEffect(() => {
    setUserData(
      JSON.parse(AuthStorage.getStorageData(STORAGEKEY.userData)) ?? {}
    );
    if (adminId.length > 0) {
      ApiGet(`admin/get-admin-by/${adminId}`)
        .then((res) => {
          setLogo(res.data[0]?.logo);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [getStorage, adminId]);


  // Modal function
  const [isModalVisible, setIsModalVisible] = useState(false);
  const openModal = () => setIsModalVisible(true)
  const closeModal = () => setIsModalVisible(false);


  const handleLogout = () => {
    // Perform logout logic here
    console.log("Logging out...");
    closeModal();
    navigate('/signin')
  };

  useEffect(() => {
    // Simulate loading for 2 seconds
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);


  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setSidebarClosed(true);
      } else {
        setSidebarClosed(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    const sideLinks = document.querySelectorAll('.sidebar .side-menu li a:not(.logout)');
    sideLinks.forEach(item => {
      const li = item.parentElement;
      item.addEventListener('click', () => {
        sideLinks.forEach(i => {
          i.parentElement.classList.remove('active');
        });
        li.classList.add('active');
      });
    });
  }, []);

  return (
    <div className={`app ${theme ? 'dark' : ''}`}>
      <SkeletonTheme baseColor="#D4D4D4">
        <div className={`sidebar ${isSidebarClosed ? 'close' : ''}`}>
          {loading ? (
            <Skeleton height={50} width="90%" style={{ margin: '1rem', marginTop: '1rem' }} />
          ) : (
            // <a href="#" className="logo">
            //   {logo?.length > 0 ? (<img src={logo} alt="user" className="rounded-full size-6" />
            //   ) : (<i className='bx bxs-user-circle'></i>)}
            //   <div className={`logo-name ${isSidebarClosed ? 'hidden' : ''} font-medium text-[18px] border-l-2 border-gray-300 pl-2`}>{userData?.name}</div>
            // </a>
            <a href="#" className="logo flex items-center gap-2">
              {logo?.length > 0 ? (
                <img
                  src={logo}
                  alt="user"
                  className="rounded-full w-6 h-6 object-cover"
                />
              ) : (
                <i className="bx bxs-user-circle text-[24px]"></i>
              )}
              <div
                className={`logo-name ${isSidebarClosed ? 'hidden' : ''
                  } font-medium text-[18px] border-l-2 border-gray-300 pl-2`}
              >
                {userData?.name}
              </div>
            </a>

          )}
          {/* 
          <Menu ref={menuRef} mode="inline" className='mt-0 bg-[#F6F6F9]' defaultSelectedKeys={[location.pathname]}>
            {loading ? (
              <>
                {Array(5).fill(null).map((_, index) => (
                  <Skeleton key={index} height={50} width="90%" style={{ margin: '1rem', marginBottom: '1rem' }} />
                ))}
              </>
            ) : (
              <>
                <Menu.Item key="/dashboard" className={location.pathname === '/dashboard' ? 'active' : ''}>
                  <Link className="font-semibold flex items-center my-5" to="/dashboard">
                    <i className="bx bxs-dashboard pr-2"></i>
                    {!isSidebarClosed && <span className='font-medium'>Dashboard</span>}
                  </Link>
                </Menu.Item>

                <Menu.SubMenu key="/administration"
                  title={
                    <span className='my-5 flex items-center'>
                      <MdOutlineAdminPanelSettings className='pr-2' size={30} />
                      {!isSidebarClosed && <span>Administration</span>}
                    </span>
                  }
                  className={`${location.pathname.startsWith('/administration') ? 'active' : ''}`}
                >
                  <Menu.Item key="/administration/manage">
                    <Link to="/administration/manage">
                      {!isSidebarClosed && <span>Manage Admins</span>}
                    </Link>
                  </Menu.Item>
                  <Menu.Item key="/administration/reports">
                    <Link to="/administration/reports">
                      {!isSidebarClosed && <span>Admin Reports</span>}
                    </Link>
                  </Menu.Item>
                </Menu.SubMenu>

                <Menu.Item key="/entityRole" className={location.pathname === '/entityRole' ? 'active' : ''}>
                  <Link className="font-semibold my-5 flex items-center" to="/analytics">
                    <LiaPeopleCarrySolid className='pr-2' size={32} />
                    {!isSidebarClosed && <span className='font-normal '>Entity Roles</span>}
                  </Link>
                </Menu.Item>
                <Menu.Item key="/entities" className={location.pathname === '/entities' ? 'active' : ''}>
                  <Link className="font-semibold my-5 flex items-center" to="/entities">
                    <TbUsersPlus className='pr-2' size={32} />
                    {!isSidebarClosed && <span className='font-normal '>Entities</span>}
                  </Link>
                </Menu.Item>
                <Menu.Item key="/users" className={location.pathname === '/users' ? 'active' : ''}>
                  <Link className="font-semibold my-5 flex items-center" to="/users">
                    <HiOutlineUsers className='pr-2' size={32} />
                    {!isSidebarClosed && <span className='font-normal '>Users</span>}
                  </Link>
                </Menu.Item>
                <Menu.Item key="/products" className={location.pathname === '/products' ? 'active' : ''}>
                  <Link className="font-semibold my-5 flex items-center" to="/products">
                    <BsBoxSeam className='pr-2' size={30} />
                    {!isSidebarClosed && <span className='font-normal '>Products</span>}
                  </Link>
                </Menu.Item>
                <Menu.Item key="/admins" className={location.pathname === '/admins' ? 'active' : ''}>
                  <Link className="font-semibold my-5 flex items-center" to="/admins">
                    <PiBuildingOfficeLight className='pr-2' size={30} />
                    {!isSidebarClosed && <span className='font-normal '>Corporations</span>}
                  </Link>
                </Menu.Item>
                <Menu.Item key="/transactions" className={location.pathname === '/transactions' ? 'active' : ''}>
                  <Link className="font-semibold my-5 flex items-center" to="/transactions">
                    <LiaFileInvoiceDollarSolid className='pr-2' size={30} />
                    {!isSidebarClosed && <span className='font-normal '>Transactions</span>}
                  </Link>
                </Menu.Item>
                <Menu.Item key="/settings" className={location.pathname === '/settings' ? 'active' : ''}>
                  <Link className="font-semibold my-5 flex items-center" to="/settings">
                    <i className="pr-2 bx bx-cog text-2xl"></i>
                    {!isSidebarClosed && <span className='font-normal '>Settings</span>}
                  </Link>
                </Menu.Item>
              </>
            )}
          </Menu> */}

          {/* <Menu ref={menuRef} mode="inline" className="mt-0 bg-[#F6F6F9]" defaultSelectedKeys={[location.pathname]}>
            {loading ? (
              // Show skeletons while loading
              Array(5).fill(null).map((_, index) => (
                <Skeleton key={index} height={50} width="90%" style={{ margin: "1rem", marginBottom: "1rem" }} />
              ))
            ) : (
              // Dynamically render menu items
              navbarData.map((item) => (
                item.subItem ? (
                  // Render SubMenu for items with subItem
                  <Menu.SubMenu
                    key={item.text}
                    title={
                      <span className="flex items-center">
                        {typeof item.img === "string" ? (
                          <i className={`${item.img} pr-2`} />
                        ) : (
                          <item.img className="pr-2" size={30} />
                        )}
                        {!isSidebarClosed && <span>{item.text}</span>}
                      </span>
                    }
                  >
                    {item.subItem.map((sub) => (
                      <Menu.Item key={sub.text}>
                        <Link to={`/${sub.path}`}>
                          {typeof sub.img === "string" ? (
                            <i className={`${sub.img} pr-2`} />
                          ) : (
                            <sub.img className="pr-2" size={30} />
                          )}
                          {!isSidebarClosed && <span>{sub.text}</span>}
                        </Link>
                      </Menu.Item>
                    ))}
                  </Menu.SubMenu>
                ) : (
                  // Render Menu.Item for items without subItem
                  <Menu.Item key={item.text}>
                    <Link to={`/${item.path}`}>
                      {typeof item.img === "string" ? (
                        <i className={`${item.img} pr-2`} />
                      ) : (
                        <item.img className="pr-2" size={30} />
                      )}
                      {!isSidebarClosed && <span>{item.text}</span>}
                    </Link>
                  </Menu.Item>
                )
              ))
            )}
          </Menu> */}

          <Menu ref={menuRef} mode="inline" className="mt-0 bg-[#F6F6F9]" defaultSelectedKeys={[location.pathname]}>
            {loading ? (
              <>
                {Array(5).fill(null).map((_, index) => (
                  <Skeleton key={index} height={50} width="90%" style={{ margin: "1rem", marginBottom: "1rem" }} />
                ))}
              </>
            ) : (
              <>
                {navbarData.map((item) => (
                  <React.Fragment key={item.text}>
                    {item.subItem ? (
                      <Menu.SubMenu
                        key={item.text}
                        title={
                          <span className="my-5 flex items-center">
                            {typeof item.img === "string" ? (
                              <i className={`${item.img} pr-2`} />
                            ) : (
                              <item.img className="pr-2" size={30} />
                            )}
                            {!isSidebarClosed && <span>{item.text}</span>}
                          </span>
                        }
                        className={location.pathname.startsWith(`/${item.path}`) ? "active" : ""}
                      >
                        {/* Render nested submenu items */}
                        {item.subItem.map((sub) => (
                          <React.Fragment key={sub.text}>
                            {sub.subData ? (
                              <Menu.SubMenu
                                key={sub.text}
                                title={
                                  <span className='flex items-center'>
                                    {typeof sub.img === "string" ? (
                                      <i className={`${sub.img} pr-2`} />
                                    ) : (
                                      <sub.img className="pr-2" size={20} />
                                    )}
                                    {!isSidebarClosed && <span>{sub.text}</span>}
                                  </span>
                                }
                              >
                                {sub.subData.map((nested) => (
                                  <Menu.Item key={nested.path}>
                                    <Link to={`/${nested.path}`} className='flex items-center'>
                                      {typeof nested.img === "string" ? (
                                        <i className={`${nested.img} pr-2`} />
                                      ) : (
                                        <nested.img className="pr-2" size={20} />
                                      )}
                                      {!isSidebarClosed && <span>{nested.text}</span>}
                                    </Link>
                                  </Menu.Item>
                                ))}
                              </Menu.SubMenu>
                            ) : (
                              <Menu.Item key={sub.path}>
                                <Link to={`/${sub.path}`} className='flex items-center'>
                                  {typeof sub.img === "string" ? (
                                    <i className={`${sub.img} pr-2`} />
                                  ) : (
                                    <sub.img className="pr-2" size={20} />
                                  )}
                                  {!isSidebarClosed && <span>{sub.text}</span>}
                                </Link>
                              </Menu.Item>
                            )}
                          </React.Fragment>
                        ))}
                      </Menu.SubMenu>
                    ) : (
                      <Menu.Item key={item.path} className={location.pathname === `/${item.path}` ? "active" : ""}>
                        <Link className="font-semibold flex items-center my-5" to={`/${item.path}`}>
                          {typeof item.img === "string" ? (
                            <i className={`${item.img} pr-2`} />
                          ) : (
                            <item.img className="pr-2" size={30} />
                          )}
                          {!isSidebarClosed && <span className="font-normal">{item.text}</span>}
                        </Link>
                      </Menu.Item>
                    )}
                  </React.Fragment>
                ))}
              </>
            )}
          </Menu>;



          <ul className="side-menu">
            {loading ? (
              <Skeleton height={30} width="90%" style={{ margin: '1rem', marginBottom: '1rem' }} />
            ) : (
              <li>
                <Link onClick={openModal} className="logout">
                  <i className='bx bx-log-out-circle'></i>
                  {!isSidebarClosed && <span>Logout</span>}
                </Link>
              </li>
            )}
          </ul>
        </div>
      </SkeletonTheme>

      <div className="content">
        <Navbar
          isSidebarClosed={isSidebarClosed}
          setSidebarClosed={setSidebarClosed}
          theme={theme}
          setTheme={setTheme}
        />

        <div {...props}>
          {children}

        </div>
      </div>

      <LogoutModal isOpen={isModalVisible} onClose={closeModal} onConfirm={handleLogout} />
    </div>

  );
}

export default Sidebar