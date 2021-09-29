import React from 'react';
import { NavLink } from 'react-router-dom';

const NavLinkButton = ({children, to, className}) => {
    return (
        <NavLink to={to} className={`inline-block text-white bg-indigo-700 rounded-lg px-4 py-2 hover:shadow-lg hover:bg-indigo-600 ${className}`} activeClassName="shadow-lg !bg-indigo-600">
            {children}
        </NavLink>
    )
}

export default NavLinkButton;