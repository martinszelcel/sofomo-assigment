import React, { useContext } from 'react';
import NavLinkButton from '../components/NavLinkButton';
import SiteTitle from '../components/SiteTitle';

import { UserContext } from '../contexts/UserContext';
import Button from '../components/Button';
import GeolocationFinder from '../components/geolocation/GeolocationFinder';

export default function Home() {
    const userContext = useContext(UserContext); 

    return (
        <>
            <div className="relative right-4 top-4 text-right z-10 flex justify-end items-center gap-4">
                { userContext.isLoggedIn ? (
                    <>
                        <div className="text-indigo-300">{userContext.email}</div>
                        <Button to="/logout" onClick={userContext.logout}>Logout</Button>
                    </>
                ) : (
                    <>
                        <NavLinkButton to="/login">Login</NavLinkButton>
                        <NavLinkButton to="/register">Register</NavLinkButton>
                    </>
                )}
            </div>

            <div className="mt-16 text-center flex flex-col items-center">
                <SiteTitle />
                <GeolocationFinder />
            </div>
        </>
    );
}