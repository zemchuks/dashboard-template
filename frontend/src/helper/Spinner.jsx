import React from 'react';

const Spinner = () => {
    return (
        <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-full animate-spin border-4 border-solid border-white border-t-transparent"></div>
        </div>
    );
};

export default Spinner;
