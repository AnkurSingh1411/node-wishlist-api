const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const product = new Schema({
    title: String,
    price: Number,
    likes: Number
});

module.exports = mongoose.model('Product', product);