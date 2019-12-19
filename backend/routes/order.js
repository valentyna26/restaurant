const express = require("express");
const Cart = require("../models/cart");
const router = express.Router();

var dishes = [];
router.post("", (req, res, next) => {
    //TODO store order to Mongo
    console.log(req.body);
    console.log(req.body._id);
    while(Cart.length > 0) {
        Cart.pop();
    }
});

module.exports = router;
