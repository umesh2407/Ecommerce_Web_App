const express = require("express");
const cors = require("cors");
const app = express();

const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.json());

app.use(
  cors({
    origin: "*",
    methods: "GET,UPDATE,PUT,DELETE,PATCH",
    credentials: true,
  })
);

//for login and signup
const authRoute = require("./routes/auth");
app.use("/api/auth", authRoute);

//users
const userRoute = require("./routes/user");
app.use("/api/user", userRoute);

//products
const productRoute = require("./routes/product");
app.use("/api/product",productRoute);

//cart
const cartRoute = require("./routes/cart");
app.use("/api/cart",cartRoute);

//category
const categoryRoute = require('./routes/category');
app.use("/api/category",categoryRoute)

app.get('/',(req, res)=>{
    res.send("Hello from Server!!! ")
})

module.exports = app;
