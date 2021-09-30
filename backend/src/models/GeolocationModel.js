const mongoose = require('mongoose');
const { Schema } = mongoose;

const GeolocationSchema = new Schema({
    ip: { type: String, required: true, unique: true },
    city: { type: String },
    continent: { type: String },
    country: { type: String },
    region: { type: String },
    zip: { type: String },
    callingCode: { type: String },
    capital: { type: String },
    countryFlag: { type: String },
}, {
    timestamps: true
});

module.exports = mongoose.model('Geolocation', GeolocationSchema);