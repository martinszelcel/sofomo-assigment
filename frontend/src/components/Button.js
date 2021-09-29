import React from 'react';

const Button = ({children, onClick, type, className}) => {
    return (
        <button onClick={onClick} type={type ? type : "submit"} className={`bg-indigo-700 rounded-lg px-4 py-2 hover:shadow-lg hover:bg-indigo-600 ${className}`}>
            {children}
        </button>
    )
}

export default Button;