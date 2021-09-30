import React from 'react';
import AddressTable from '../components/AddressTable';
import { UserContext } from '../contexts/UserContext';
import AddressInput from '../components/AddressInput';
import Button from '../components/Button';
import api from "../services/api";
import geolocationService from '../services/geolocationService';

export default class GeolocationFinder extends React.Component {
    state = {
        geolocations: []
    }

    componentDidMount() {
        this.refreshGeolocationsList();
    }

    refreshGeolocationsList = () => {
        geolocationService.getGeolocations()
        .then(geolocations => {
            this.setState({geolocations});
        })
        .catch(error => {
            console.log(error);
        })
    }

    removeGeolocation = (address) => {
        geolocationService.removeGeolocation(address)
        .then(response => {
            console.log(response);
        })
        .catch(error => {
            console.log(error);
        })
    }

    render() {
        return (
            <>
                <AddressInput refreshGeolocationsList={this.refreshGeolocationsList} />

                <UserContext.Consumer>
                    {({isLoggedIn}) =>
                        isLoggedIn ? (
                            <>
                                <AddressTable geolocations={this.state.geolocations} removeGeolocation={this.removeGeolocation} />
                                <Button>Add</Button>
                            </>
                        ) : null
                    }
                </UserContext.Consumer>
                
            </>
        )
    }

}