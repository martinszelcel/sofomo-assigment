import React from 'react';
import NavLinkButton from '../components/NavLinkButton';
import AddressInput from '../components/AddressInput';
import SiteTitle from '../components/SiteTitle';
import AddressTable from '../components/AddressTable';

export default function Home() {
    return (
        <>
            <div className="relative right-4 top-4 text-right z-10 flex flex-row-reverse gap-2">
                <NavLinkButton to="/login">Login</NavLinkButton>
                <NavLinkButton to="/register">Register</NavLinkButton>
            </div>

            <div className="mt-16 text-center flex flex-col items-center">
                <SiteTitle />
                <AddressInput />
                <AddressTable />

                Add
            </div>
        </>
    );
}