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


app.get('/wishlist', (req, res) => {
    Wishlist.find({}).populate({path: 'products', model: 'Product'}).exec((err, wishlists) => {
        if (err) {
            res.status(500).send({error: 'Error: could not retrieve wishlists'});
        } else {
            res.send(wishlists)
        }
    })
});

app.post('/wishlist', (req, res) => {
    let wishlist = new Wishlist();
    wishlist.title = req.body.title;

    wishlist.save((err, newWishlist) => {
        if (err) {
            res.status(500).send({error: 'Error: could not create Wishlist'});
        } else {
            res.send(newWishlist);
        }
    })
});

app.put('/wishlist/product/add', (req, res) => {
    Product.findOne({_id: req.body.productId}, (err, product) => {
        if (err) {
            res.status(500).send({error: 'Error: could not add item to Wishlist'});
        } else {
            Wishlist.update({_id: req.body.wishlistId},
                {$addToSet: {products: product._id}},
                (err, wishlist) => {
                    if (err) {
                        res.status(500).send({error: 'Error: could not add item to Wishlist'});
                    } else {
                        res.send(wishlist)
                    }
                })
        }
    })
});


app.listen(port, () => {
    console.log(`Wishlist API server on port ${port}`);
});



