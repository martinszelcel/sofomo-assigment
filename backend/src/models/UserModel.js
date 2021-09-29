const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
    email: { type: String, unique: true, lowercase: true, required: true },
    password: { type: String, required: true },
}, {
    timestamps: true
});

UserSchema.methods.setPassword = async function (password) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(password, saltRounds);
};

UserSchema.methods.validatePassword = async function(password) {
    return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model('User', UserSchema);