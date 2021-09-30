import React from 'react';

export default function TableCell({ tag, children }) {
    const Tag = tag ? tag : "td";

    return (
        <Tag className="border border-indigo-500 px-4 py-2">
            {children}
        </Tag>
    )
}