import React from 'react';

export default function TableHeader({ children, className, onClick }) {
    return (
        <th className={`border border-indigo-500 px-4 py-2 font-bold ${className}`} onClick={onClick}>
            {children}
        </th>
    )
}