import React from "react";
import api from "../services/api";

export default class AddressTable extends React.Component {
    state = {
        geolocations: []
    }

    componentDidMount() {
        api.get('/geolocation')
        .then(response => {
            this.setState({
                geolocations: response.data
            })
        })
        .catch(error => {
            console.log(error);
        })
    }

    render() {
        return (
            <table className="mt-10 text-center bg-indigo-800 border-collapse border border-indigo-700 rouded-lg shadow-xl">
                <thead>
                    <tr>
                        <th className="border border-indigo-700">Name</th>
                        <th className="border border-indigo-700">IP address</th>
                        <th className="border border-indigo-700">Type</th>
                        <th className="border border-indigo-700">Country</th>
                        <th className="border border-indigo-700">Region</th>
                        <th className="border border-indigo-700">City</th>
                        <th className="border border-indigo-700">Country flag</th>
                        <th className="border border-indigo-700">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.geolocations.map(geolocation => (
                        <tr key={geolocation._id}>
                            <td className="border border-indigo-700">{geolocation.name}</td>
                            <td className="border border-indigo-700">{geolocation.ip}</td>
                            <td className="border border-indigo-700">{geolocation.geolocationData.type}</td>
                            <td className="border border-indigo-700">{geolocation.geolocationData.country_name}</td>
                            <td className="border border-indigo-700">{geolocation.geolocationData.region_name}</td>
                            <td className="border border-indigo-700">{geolocation.geolocationData.city}</td>
                            <td className="border border-indigo-700">{geolocation.geolocationData.location.country_flag_emoji}</td>
                            <td className="border border-indigo-700">Edit Remove</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        );
    }
}