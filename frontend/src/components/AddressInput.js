import React, { useContext } from "react";
import { useFormik } from 'formik';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import api from "../services/api";
import { UserContext } from "../contexts/UserContext";

export default function AddressInput({refreshGeolocationsList}) {
    const userContext = useContext(UserContext);

    const formik = useFormik({
        initialValues: {
            address: ''
        },
        onSubmit: ({address}) => {
            api.get(`/geolocation/${encodeURIComponent(address)}`)
            .then(response => {
                console.log(response);
                refreshGeolocationsList();
            })
            .catch(error => {
                console.log(error);
            })
        }
    })

    return (
        <form onSubmit={formik.handleSubmit} className="w-full max-w-2xl rounded-lg text-xl bg-indigo-800 transition-all duration-300 ease-in-out flex hover:shadow-2xl">
            <input onChange={formik.handleChange} className="px-4 py-2 bg-transparent rounded-l-lg w-full" type="text" name="address" placeholder={userContext.isLoggedIn ? "Type URL or IP address here..." : "You need to be logged in to use this app"} disabled={!userContext.isLoggedIn} />
            <button type="submit" className="px-4 bg-indigo-700 rounded-r-lg hover:bg-indigo-600 disabled:bg-indigo-700 disabled:cursor-not-allowed" disabled={!userContext.isLoggedIn}>
                <FontAwesomeIcon icon={faSearch} size="lg" />
            </button>
        </form>
    )
}