import React, { useState } from 'react'

const LogoutModal = ({ isVisible, onClose, onConfirm }) => {
    const [isLoading, setIsLoading] = useState(false);
    // const navigate = useNavigate(); // Assuming you're using React Router

    if (!isVisible) return null;

    const handleConfirm = () => {
        setIsLoading(true);

        // Simulate loading for 2 seconds
        setTimeout(() => {
            onConfirm(); // Call the onConfirm function
            // navigate('/your-logout-route'); // Replace with your logout route
        }, 4000);
    };
    if (!isVisible) return null;
    return (
        <div className="fixed inset-0 z-50 flex items-start justify-center bg-black bg-opacity-50">
            <div className="rounded-lg bg-white p-8 shadow-2xl mt-[6rem]">
                <h2 className="text-lg font-bold">Logout from oramsys?</h2>

                <p className="mt-2 text-sm text-gray-500">
                    This will log you out of this session. Are you sure you want to log out??
                </p>

                <div className="mt-4 flex gap-2">
                    {isLoading ? (
                        <button
                            disabled
                            className="rounded bg-gray-50 px-4 py-2 text-sm font-medium text-gray-600 flex items-center opacity-75"
                        >
                            <svg
                                className="animate-spin h-5 w-5 mr-2 text-gray-600"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <circle
                                    className="opacity-25"
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                ></circle>
                                <path
                                    className="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8v4a4 4 0 000 8v4a8 8 0 01-8-8z"
                                ></path>
                            </svg>
                            Logging out...
                        </button>
                    ) : (
                        <button
                            type="button"
                            onClick={handleConfirm}
                            className="rounded bg-green-50 px-4 py-2 text-sm font-medium text-green-600"
                        >
                            Yes, I'm sure
                        </button>
                    )}

                    <button type="button" onClick={onClose} className="rounded bg-gray-50 px-4 py-2 text-sm font-medium text-gray-600">
                        No, go back
                    </button>
                </div>
            </div>
        </div>
    )
}

export default LogoutModal