const express = require("express");
const multer = require("multer");
const Dish = require("../models/dish");
const router = express.Router();
const mongoose = require("mongoose");

const MIME_TYPE_MAP = {
    "image/png": "png",
    "image/jpeg": "jpg",
    "image/jpg": "jpg"
};

var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, "backend/images");
    },
    filename: function(req, file, cb) {
        const name = file.originalname
            .toLowerCase()
            .split(" ")
            .join("-");
        const ext = MIME_TYPE_MAP[file.mimetype];
        cb(null, name + "-" + Date.now() + "." + ext);
    }
});

router.post(
    "",
    multer({ storage: storage }).single("image"),
    (req, res, next) => {
        const url = req.protocol + "://" + req.get("host");
        let fileName;

        if (!req.file) {

            console.log('No file')
            fileName = 'noImage.jpg';
        } else {
            fileName = req.file.filename
        }
        const dish = new Dish({
            _id: mongoose.Types.ObjectId(),
            title: req.body.title,
            disc: req.body.disc,
            price: req.body.price,
            image: url + "/images/" + fileName
        });
        console.log(dish.disc);
        dish.save().then(createdDish=> {
            res.status(201).json({
                message: "Dish added successfully",
                dish: createdDish
            });
        });
    }
);


router.get("", (req, res, next) => {
    Dish.find().then(documents => {
        res.status(200).json({
            message: "Dishes fetched successfully!",
            Dishes: documents
        });
    });
});

router.get("/:id", (req, res, next) => {
    Dish.findById(req.params.id).then(Dish => {
        if (Dish) {
            res.status(200).json(Dish);
        } else {
            res.status(404).json({ message: "Dish not found!" });
        }
    });
});

router.delete("/:id", (req, res, next) => {
    Dish.deleteOne({ _id: req.params.id }).then(result => {
        console.log(result);
        res.status(200).json({ message: "Dish deleted!" });
    });
});

module.exports = router;
