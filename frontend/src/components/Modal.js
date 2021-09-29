import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router';

export default function Modal({children}) {
    const history = useHistory();

    const close = () => {
        history.push('/');
    }

    return (
        <div className="fixed z-10 inset-0 overflow-y-auto" role="dialog" aria-modal="true">
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        
                <div onClick={close} className="fixed inset-0 bg-gray-900 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
                <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

                <div className="inline-block align-bottom bg-indigo-900 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full relative">
                    {children}
                    
                    <Link to="/" className="absolute right-4 top-4">
                        <FontAwesomeIcon icon={faTimes} size="lg" />
                    </Link>
                </div>

            </div>
        </div>
    )
}