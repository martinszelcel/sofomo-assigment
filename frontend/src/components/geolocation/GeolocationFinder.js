import React from 'react';
import GeolocationTable from './GeolocationTable';
import { UserContext } from '../../contexts/UserContext';
import AddressInput from './AddressInput';
import geolocationService from '../../services/geolocationService';
import GeolocationEdit from './GeolocationEdit';
import GeolocationDetails from './GeolocationDetails';

export default class GeolocationFinder extends React.Component {
    state = {
        geolocations: [],
        geolocation: null,
        editMode: false,
        inputErrorMessage: null,
        tableErrorMessage: null
    }

    getGeolocationsList = () => {
        geolocationService.getGeolocations().then(geolocations => {
            this.setState({geolocations});
        }).catch(error => {
            console.log(error);
            this.setState({
                tableErrorMessage: error.response.data.message
            })
        })
    }

    getGeolocation = (address) => {
        geolocationService.getGeolocation(address).then(geolocation => {
            this.setState({
                geolocation,
                inputErrorMessage: null
            });
            this.getGeolocationsList();
        }).catch(error => {
            this.setState({
                inputErrorMessage: error.response.data.message
            })
        })
    }

    removeGeolocation = (address) => {
        geolocationService.removeGeolocation(address).then(response => {
            console.log(response);
            this.setState({
                geolocation: null,
                editMode: false,
            })
            this.getGeolocationsList();
        }).catch(error => {
            console.log(error);
        })
    }

    updateGeolocation = (geolocation) => {
        geolocationService.updateGeolocation(geolocation.ip, geolocation)
        .then(response => {
            console.log(response)
            this.setState({
                geolocation,
                editMode: false
            });
            this.getGeolocationsList();
        })
        .catch(error => {
            console.log(error);
        })
    }

    editGeolocation = (geolocation) => {
        this.setState({
            geolocation,
            editMode: true
        });
    }

    render() {
        const { geolocation, geolocations, editMode, inputErrorMessage, tableErrorMessage } = this.state;

        return (
            <>
                <AddressInput refreshGeolocationsList={this.refreshGeolocationsList} getGeolocation={this.getGeolocation} />
                {inputErrorMessage}

                <UserContext.Consumer>
                    {({isLoggedIn}) =>
                        isLoggedIn ? (
                            <>
                                {geolocation ? 
                                    editMode ? <GeolocationEdit geolocation={geolocation} removeGeolocation={this.removeGeolocation} updateGeolocation={this.updateGeolocation} />
                                    : <GeolocationDetails geolocation={geolocation} removeGeolocation={this.removeGeolocation} editGeolocation={this.editGeolocation} /> 
                                    : null}
                                {isLoggedIn ? (
                                    <GeolocationTable geolocations={geolocations} getGeolocationsList={this.getGeolocationsList} removeGeolocation={this.removeGeolocation} editGeolocation={this.editGeolocation} />
                                ) : tableErrorMessage ? (
                                    <div className="text-xl font-bold mt-10">
                                        {tableErrorMessage}
                                    </div>
                                ) : null}
                            </>
                        ) : null
                    }
                </UserContext.Consumer>
                
            </>
        )
    }

}