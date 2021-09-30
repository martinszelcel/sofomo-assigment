import api from "./api"

export default {
    getGeolocations() {
        return new Promise((resolve, reject) => {
            api.get('/geolocation')
            .then(response => {
                resolve(response.data);
            })
            .catch(error => {
                reject(error);
            });
        });
    },

    getGeolocation(address) {
        return new Promise((resolve, reject) => {
            api.get(`/geolocation/${encodeURIComponent(address)}`)
            .then(response => {
                resolve(response.data);
            })
            .catch(error => {
                reject(error);
            });
        });
    },

    removeGeolocation(address) {
        return new Promise((resolve, reject) => {
            api.delete(`/geolocation/${encodeURIComponent(address)}`)
            .then(response => {
                resolve(response.data);
            })
            .catch(error => {
                reject(error);
            });
        });
    },

    updateGeolocation(address, geolocation) {
        return new Promise((resolve, reject) => {
            api.put(`/geolocation/${encodeURIComponent(address)}`, geolocation)
            .then(response => {
                resolve(response.data);
            })
            .catch(error => {
                reject(error);
            })
        })
    }
}