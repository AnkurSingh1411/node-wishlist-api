const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let ObjectId = mongoose.Schema.Types.ObjectId;

let wishlist = new Schema({
    title: {type: String, default: 'My Wish List'},
    products: [{type: ObjectId, ref: 'Product'}]
});

module.exports = mongoose.model('Wishlist', wishlist);