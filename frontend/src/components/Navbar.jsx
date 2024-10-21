import React, { useEffect, useState } from 'react';
import { CiUser } from "react-icons/ci";
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'; // Import default styles

const Navbar = ({ isSidebarClosed, setSidebarClosed, theme, setTheme }) => {
  const [isSearchFormShown, setSearchFormShown] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [expanded, setExpanded] = useState({});


  // handle modal toggle
  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  const toggleExpanded = (index) => {
    setExpanded((prev) => ({ ...prev, [index]: !prev[index] }));
  };
  const toggleFullscreen = () => {
    if (document.fullscreenElement) {
      // Exit fullscreen
      document.exitFullscreen();
    } else {
      // Request fullscreen
      document.documentElement.requestFullscreen();
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  // Sample notifications
  const notifications = [
    {
      title: 'New Order',
      content: 'You have received a new order. The order ID is 12345. Please process it as soon as possible.',
    },
    {
      title: 'Payment Confirmed',
      content: 'The payment for the order #12345 has been confirmed. You can now proceed with the shipping process.',
    },
    {
      title: 'Unread Messages',
      content: 'You have 5 unread messages. Please check your inbox. One of the messages is from a new customer inquiry about bulk orders.',
    },

  ];

  // Limit for how much content to show initially
  const contentLimit = 15; // You can adjust this word limit

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 576) {
        setSearchFormShown(false);
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleMenuClick = () => {
    setSidebarClosed(!isSidebarClosed);
  };

  const handleSearchClick = (e) => {
    if (window.innerWidth < 576) {
      e.preventDefault();
      setSearchFormShown(!isSearchFormShown);
    }
  };

  const handleThemeToggle = () => {
    setTheme(!theme);
    if (theme) {
      document.body.classList.remove('dark');
    } else {
      document.body.classList.add('dark');
    }
  };

  return (
    <nav className='sticky top-0 z-50 bg-white shadow-md'>
      <SkeletonTheme baseColor="#D4D4D4">
        {loading ? <Skeleton height={30} width="90%" style={{ margin: '1rem', marginTop: '1rem' }} /> :
          <i className='bx bx-menu' onClick={handleMenuClick}></i>
        }
        <form action="#">
          {loading ? <Skeleton height={30} width="90%" style={{ margin: '1rem', marginTop: '1rem' }} /> :
            <div className={`form-input ${isSearchFormShown ? 'show' : ''}`}>
              <input type="search" placeholder="Search..." />
              <button className="search-btn" type="submit" onClick={(e) => handleSearchClick(e)}>
                <i className={`bx ${isSearchFormShown ? 'bx-x' : 'bx-search'}`}></i>
              </button>
            </div>
          }
        </form>
        {loading ? <Skeleton height={30} width="90%" className='mr-4' style={{ margin: '1rem', marginTop: '1rem' }} /> :
          <>
            <input type="checkbox" id="theme-toggle" hidden checked={theme} onChange={handleThemeToggle} />
            <label htmlFor="theme-toggle" className="theme-toggle"></label>
          </>}

        {loading ? <Skeleton height={30} width="90%" className='mr-4' style={{ margin: '1rem', marginTop: '1rem' }} /> : 
          <button onClick={toggleFullscreen}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            className="hover:bg-gray-100 rounded-full"
            viewBox="0 0 24 24"
            style={{ fill: 'gray' }}
          >
            <path d="M5 5h5V3H3v7h2zm5 14H5v-5H3v7h7zm11-5h-2v5h-5v2h7zm-2-4h2V3h-7v2h5z"></path>
          </svg>
        </button>
        }
        

        <div className='relative'>
          {loading ? <Skeleton height={30} width="90%" className='mr-4' style={{ margin: '1rem', marginTop: '1rem' }} /> :
            <a href="#" className="notif" onClick={toggleModal}>
              <i className='bx bx-bell'></i>
              <span className="count">12</span>
            </a>
          }

          {/* Modal Overlay */}
          {/* {isOpen && (
          <>
            <div
              className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm transition-opacity duration-300"
              onClick={toggleModal}
            ></div>


            <div className={`fixed top-0 right-0 h-full bg-white w-full max-w-sm transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
              <div className="p-4">
                <h2 className="text-lg font-bold">Notifications</h2>
                <ul className="mt-4 space-y-2">
                  <li className="p-2 bg-gray-100 rounded-lg">New order received</li>
                  <li className="p-2 bg-gray-100 rounded-lg">Payment confirmed</li>
                  <li className="p-2 bg-gray-100 rounded-lg">You have 5 unread messages</li>
                  <li className="p-2 bg-gray-100 rounded-lg">New comment on your post</li>
                </ul>
              </div>

              <button
                onClick={toggleModal}
                className="absolute top-4 right-4 text-black text-3xl"
              >
                &times;
              </button>
            </div>
          </>
        )} */}

          {isOpen && (
            <>
              <div
                className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm transition-opacity duration-300"
                onClick={toggleModal}
              ></div>

              {/* Modal */}
              <div className={`fixed top-0 right-0 h-full bg-white w-full max-w-sm transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                <div className="p-4 h-full flex flex-col">
                  <h2 className="text-lg font-bold">Notifications</h2>

                  {/* Scrollable area for notifications */}
                  <div className="mt-4 overflow-y-auto flex-1">
                    <ul className="space-y-2">
                      {notifications.map((notification, index) => {
                        const words = notification.content.split(' ');
                        const isLong = words.length > contentLimit;

                        return (
                          <li key={index} className="p-2 bg-gray-100 rounded-lg">
                            <h3 className="font-bold">{notification.title}</h3>
                            <p className="text-sm">
                              {isLong && !expanded[index]
                                ? `${words.slice(0, contentLimit).join(' ')}...`
                                : notification.content}
                            </p>
                            {isLong && (
                              <button
                                className="text-blue-500 text-xs mt-1"
                                onClick={() => toggleExpanded(index)}
                              >
                                {expanded[index] ? 'See less' : 'See more'}
                              </button>
                            )}
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>

                {/* Close Button */}
                <button onClick={toggleModal} className="absolute top-4 right-4 text-black text-lg">
                  &times;
                </button>
              </div>
            </>
          )}
        </div>

        {loading ? <Skeleton height={30} width="90%" className='mr-4' style={{ margin: '1rem', marginTop: '1rem' }} /> :
          <a href="#" className="profile">
            {/* <img src="/assets/images/logo1.png" alt="profile" /> */}
            <div className="text-[30px]">
              <CiUser />
            </div>
          </a>
        }


      </SkeletonTheme>
    </nav>
  );
};

export default Navbar;
