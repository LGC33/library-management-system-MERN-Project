const mongoose = require('mongoose');

const inventorySchema = new mongoose.Schema({
    departments: {
        type: String,
        required: [true, 'departments is required'],
        enum: ['Computer', 'Civil', 'Electrical', 'Mechanical', 'Biotech', 'Agriculture']
    },
    bookname: {
        type: String,
        required: [true, 'Book is required'],
    },
    semester: {
        type: String,
        required: [true, 'Semester is required'],
    },
    status: {
        type: String 
    },

    checkedOutBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, { timestamps: true });

module.exports = mongoose.model("inventories", inventorySchema);