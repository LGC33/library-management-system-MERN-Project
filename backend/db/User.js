const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    role: {
        type: String,
        require: [true, "eamil is require"],
        enum: ["student", "teacher",]
    },

    username: {
        type: String,
        require: function () {
            if (this.role === 'student' || this.role === 'teacher') {
                return true
            } else {
                return false
            }
        }
    },

    email: {
        type: String,
        require: [true, "email is require"],
        unique: true
    },
    password: {
        type: String,
        require: [true, "password is require"],
    },
    rolenumber: {
        type: Number,
        require: [true, "password is require"],
    },
    Idnumber:{
        type: Number,
    },
    address: {
        type: String,
        require: [true, "Address is require"],
    },
    phone: {
        type: Number,
        require: [true, "phone is require"],
    },


}, { timestamps: true });

module.exports = mongoose.model("users", userSchema)