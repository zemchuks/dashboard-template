import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Navbar from '../header/AuthHeader';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'; // Import default styles
import LogoutModal from '../../components/Modals/LogoutModal';
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
    navigate('/login')
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
                <li className={location.pathname === '/entityRole' ? 'active' : ''}>
                  <Link className='font-semibold' to="/analytics"><i className="bx bx-analyse"></i>Entity Roles</Link>
                </li>
                <li className={location.pathname === '/tickets' ? 'active' : ''}>
                  <Link className='font-semibold' to="/tickets"><i className="bx bx-message-square-dots"></i>Entities</Link>
                </li>
                <li className={location.pathname === '/users' ? 'active' : ''}>
                  <Link className='font-semibold' to="/users"><i className="bx bx-group"></i>Products</Link>
                </li>
                <li className={location.pathname === '/users' ? 'active' : ''}>
                  <Link className='font-semibold' to="/users"><i className="bx bx-group"></i>Users</Link>
                </li>
                <li className={location.pathname === '/users' ? 'active' : ''}>
                  <Link className='font-semibold' to="/users"><i className="bx bx-group"></i>Corporations</Link>
                </li>
                <li className={location.pathname === '/users' ? 'active' : ''}>
                  <Link className='font-semibold' to="/users"><i className="bx bx-group"></i>Transactions</Link>
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

        </div>
      </div>

      <LogoutModal isVisible={isModalVisible} onClose={closeModal} onConfirm={handleLogout} />
    </div>

  );
}