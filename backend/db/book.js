const mongoose = require('mongoose');
const BookSchema = new mongoose.Schema({
    title: String,
    author: String,
   
}, { timestamps: true });

module.exports = mongoose.model("books", BookSchema);