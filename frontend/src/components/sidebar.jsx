import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Navbar from './Navbar';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'; // Import default styles
import LogoutModal from './Modals/LogoutModal';
// import '../App.css'

export default function Sidebar({ children, ...props }) {
  const [isSidebarClosed, setSidebarClosed] = useState(false);
  const [theme, setTheme] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const navigate = useNavigate()

  const openModal = () => {
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  const handleLogout = () => {
    // Perform logout logic here
    console.log("Logging out...");
    closeModal();
    navigate('/entitysignup')
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
          {loading ?
            <Skeleton height={50} width="90%" style={{ margin: '1rem', marginTop: '1rem' }} /> :
            <a href="#" className="logo">
              <i className='bx bx-code-alt'></i>
              <div className="logo-name"> Oramsys</div>
            </a>}

          <ul className="side-menu">
            {loading ? (
              <>
                <Skeleton height={50} width="90%" style={{ margin: '1rem', marginBottom: '1rem' }} />
                <Skeleton height={50} width="90%" style={{ margin: '1rem', marginBottom: '1rem' }} />
                <Skeleton height={50} width="90%" style={{ margin: '1rem', marginBottom: '1rem' }} />
                <Skeleton height={50} width="90%" style={{ margin: '1rem', marginBottom: '1rem' }} />
              </>
            ) : (
              <>
                <li className={location.pathname === '/dashboard' ? 'active' : ''}>
                  <Link className='font-semibold' to="/dashboard"><i className="bx bxs-dashboard "></i>Dashboard</Link>
                </li>
                <li className={location.pathname === '/administration' ? 'active' : ''}>
                  <Link className='font-semibold' to="/administration"><i className="bx bx-store-alt"></i>Administration</Link>
                </li>
                <li className={location.pathname === '/analytics' ? 'active' : ''}>
                  <Link className='font-semibold' to="/analytics"><i className="bx bx-analyse"></i>Analytics</Link>
                </li>
                <li className={location.pathname === '/tickets' ? 'active' : ''}>
                  <Link className='font-semibold' to="/tickets"><i className="bx bx-message-square-dots"></i>Tickets</Link>
                </li>
                <li className={location.pathname === '/users' ? 'active' : ''}>
                  <Link className='font-semibold' to="/users"><i className="bx bx-group"></i>Users</Link>
                </li>
                <li className={location.pathname === '/settings' ? 'active' : ''}>
                  <Link className='font-semibold' to="/settings"><i className="bx bx-cog"></i>Settings</Link>
                </li>
              </>
            )}
          </ul>

          <ul className="side-menu">
            {loading ? (
              <Skeleton height={30} width="90%" style={{ margin: '1rem', marginBottom: '1rem' }} />
            ) : (
              <li>
                <Link onClick={openModal} className="logout">
                  <i className='bx bx-log-out-circle'></i>Logout
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
          {/* <div className="header">
            <div className="left">
              <h1>Dashboard</h1>
              <ul className="breadcrumb">
                <li><a href="#">
                  Analytics
                </a></li>
                /
                <li><a href="#" className="active">Shop</a></li>
              </ul>
            </div>
            <a href="#" className="report">
              <i className='bx bx-cloud-download'></i>
              <span>Download CSV</span>
            </a>
          </div>

          <ul className="insights">
            <li>
              <i className='bx bx-calendar-check'></i>
              <span className="info">
                <h3>
                  1,074
                </h3>
                <p>Paid Order</p>
              </span>
            </li>
            <li><i className='bx bx-show-alt'></i>
              <span className="info">
                <h3>
                  3,944
                </h3>
                <p>Site Visit</p>
              </span>
            </li>
            <li><i className='bx bx-line-chart'></i>
              <span className="info">
                <h3>
                  14,721
                </h3>
                <p>Searches</p>
              </span>
            </li>
            <li><i className='bx bx-dollar-circle'></i>
              <span className="info">
                <h3>
                  $6,742
                </h3>
                <p>Total Sales</p>
              </span>
            </li>
          </ul>

          <div className="bottom-data">
            <div className="orders">
              <div className="header">
                <i className='bx bx-receipt'></i>
                <h3>Recent Orders</h3>
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

            <div className="reminders">
              <div className="header">
                <i className='bx bx-note'></i>
                <h3>Remiders</h3>
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
          </div> */}
        </div>
      </div>

      <LogoutModal isVisible={isModalVisible} onClose={closeModal} onConfirm={handleLogout} />
    </div>

  );
}