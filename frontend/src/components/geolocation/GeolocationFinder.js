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
        editMode: false
    }

    componentDidMount() {
        this.getGeolocationsList();
    }

    getGeolocationsList = () => {
        geolocationService.getGeolocations()
        .then(geolocations => {
            this.setState({geolocations});
        })
        .catch(error => {
            console.log(error);
        })
    }

    getGeolocation = (address) => {
        geolocationService.getGeolocation(address)
        .then(geolocation => {
            this.setState({
                geolocation,
            });
            this.getGeolocationsList();
        })
    }

    removeGeolocation = (address) => {
        geolocationService.removeGeolocation(address)
        .then(response => {
            console.log(response);
            this.setState({
                geolocation: null,
                editMode: false,
            })
            this.getGeolocationsList();
        })
        .catch(error => {
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
        const { geolocation, geolocations, editMode } = this.state;

        return (
            <>
                <AddressInput refreshGeolocationsList={this.refreshGeolocationsList} getGeolocation={this.getGeolocation} />

                <UserContext.Consumer>
                    {({isLoggedIn}) =>
                        isLoggedIn ? (
                            <>
                                {geolocation ? 
                                    editMode ? <GeolocationEdit geolocation={geolocation} removeGeolocation={this.removeGeolocation} updateGeolocation={this.updateGeolocation} />
                                    : <GeolocationDetails geolocation={geolocation} removeGeolocation={this.removeGeolocation} editGeolocation={this.editGeolocation} /> 
                                    : null}
                                <GeolocationTable geolocations={geolocations} removeGeolocation={this.removeGeolocation} editGeolocation={this.editGeolocation} />
                            </>
                        ) : null
                    }
                </UserContext.Consumer>
                
            </>
        )
    }

}