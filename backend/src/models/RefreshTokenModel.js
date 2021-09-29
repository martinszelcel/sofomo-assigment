const mongoose = require('mongoose');

const RefreshTokenSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    refreshToken: { type: String, required: true, select: false },
}, {
    timestamps: true
});

module.exports = mongoose.model('RefreshToken', RefreshTokenSchema);