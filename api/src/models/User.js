const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: true
    },

    address: {
        type: String,
        require: true
    },

    email: {
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true
    }
},{
  timestamps: true
});

const UserModel = mongoose.model('Users', UserSchema);

exports.UserModel = UserModel