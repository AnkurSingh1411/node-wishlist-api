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

app.post('/product', (req, res) => {
    let product = new Product();
    product.title = req.body.title;
    product.price = req.body.price;

    product.save((err, savedProduct) => {
        if (err) {
            res.status(500).send({error: 'Error: could not save product to database.'})
        } else {
            res.status(200).send(savedProduct);
        }
    })
});

app.get('/product', (req, res) => {

    Product.find({}, (err, products) => {
        if (err) {
            res.status(500).send({error: 'Error: could not retrieve products from database.'})
        } else {
            res.status(200).send(products);
        }
    });
});

app.listen(port, () => {
    console.log(`Wishlist API server on port ${port}`);
});



