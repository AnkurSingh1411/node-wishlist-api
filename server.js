const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
let port = process.env.PORT || 3000;
let db = mongoose.connect('mongodb://localhost/node-wishlist-api');

let Product = require('./model/product');
let Wishlist = require('./model/wishlist');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.listen(port, () => {
    console.log(`Wishlist API server on port ${port}`);
});



