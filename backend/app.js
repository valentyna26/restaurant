const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const dishRoutes = require("./routes/dish");
const cartRoutes = require("./routes/cart");
const orderRoutes = require("./routes/order");
const emailRoutes = require("./routes/email");


const app = express();

mongoose
    .connect(
        "mongodb+srv://m220student:trewq23T@mflix-abehd.mongodb.net/test?retryWrites=true&w=majority", { useNewUrlParser: true }
    )
    .then(() => {
        console.log("Connected to database!");
    })
    .catch(() => {
        console.log("Connection failed!");
    });

app.use(express.json({ limit: '50MB' }));
app.use(express.urlencoded({ limit: '50MB', extended: true }));
app.use("/images", express.static(path.join("backend/images")));

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PATCH, PUT, DELETE, OPTIONS"
    );
    next();
});

app.use("/api/dish", dishRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/order", orderRoutes);
app.use("/api/email", emailRoutes);


module.exports = app;
