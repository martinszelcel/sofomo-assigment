const mongoose = require('mongoose');
const { Schema } = mongoose;

const GeolocationSchema = new Schema({
    ip: { type: String, required: true, unique: true },
    geolocationData: { type: Object },
}, {
    timestamps: true
});

module.exports = mongoose.model('Geolocation', GeolocationSchema);