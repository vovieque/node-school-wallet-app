const utils = require('../../../libs/utils');
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
        unique: true
    },
    displayName: {
        type: String,
        required: true
    },
    passwordHash: {
        type: String,
        required: true,
        default: "#",
        validate: {
            validator(value) {
                return value != "";
            },
            message: 'Password can not be an empty string!'
        },
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    registrationDate: {
        type: Date,
        default: Date.now
    },
    lastLoginDate: {
        type: Date,
        default: Date.now
    },
    imageUrl: String,
    googleId: String
});

UserSchema.statics.register = async function (userData) {
    userData.id = await this.getNextId();
    const user = new this(userData);
    return new Promise((resolve, reject) => {
        user.save((err, user) => {
            if (err) {
                console.log(err);
                reject(err);
            }
            resolve(user);
        });
    });
}

UserSchema.statics.getNextId = async function () {
    return new Promise((resolve, reject) => {
        this.findOne({}).sort({id : -1}).exec((err, user) => {
            if (err) {
                reject(err);
            }
            if (!user) {
                resolve(1);
            }
            resolve(user.id + 1);
        });
    });
}

const User = mongoose.model('User', UserSchema);

module.exports = User;
