import React from 'react';

export default function TableCell({ children, className }) {
    return (
        <td className={`border border-indigo-500 px-4 py-2 ${className}`}>
            {children}
        </td>
    )
}