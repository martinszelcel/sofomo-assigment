import React from "react";
import geolocationService from "../services/geolocationService";
import Button from "./Button";
import TableCell from "./TableCell";

export default function AddressTable({geolocations, removeGeolocation}) {
    return (
        <table className="mt-10 text-center bg-indigo-800 border-collapse border border-indigo-700 shadow-xl">
            <thead>
                <tr>
                    <TableCell tag="th">IP address</TableCell>
                    <TableCell tag="th">Continent</TableCell>
                    <TableCell tag="th">Country</TableCell>
                    <TableCell tag="th">Region</TableCell>
                    <TableCell tag="th">City</TableCell>
                    <TableCell tag="th">Zip</TableCell>
                    <TableCell tag="th">Calling code</TableCell>
                    <TableCell tag="th">Capital</TableCell>
                    <TableCell tag="th">Country flag</TableCell>
                    <TableCell tag="th">Action</TableCell>
                </tr>
            </thead>
            <tbody>
                {geolocations.map(geolocation => (
                    <tr key={geolocation._id}>
                        <TableCell>{geolocation.ip}</TableCell>
                        <TableCell>{geolocation.continent}</TableCell>
                        <TableCell>{geolocation.country}</TableCell>
                        <TableCell>{geolocation.region}</TableCell>
                        <TableCell>{geolocation.city}</TableCell>
                        <TableCell>{geolocation.zip}</TableCell>
                        <TableCell>{geolocation.callingCode}</TableCell>
                        <TableCell>{geolocation.capital}</TableCell>
                        <TableCell>{geolocation.countryFlag}</TableCell>
                        <TableCell>
                            Edit
                            <Button className="hover:bg-red-600" onClick={() => removeGeolocation(geolocation.ip)}>Remove</Button>
                        </TableCell>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}