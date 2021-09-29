import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGlobeEurope } from '@fortawesome/free-solid-svg-icons';

export default function SiteTitle() {
    return (
        <>
            <FontAwesomeIcon icon={faGlobeEurope} size="6x"/>
            <h1 className="text-5xl font-bold mt-4 mb-10">IP Geolocation Finder</h1>
        </>
    )
}