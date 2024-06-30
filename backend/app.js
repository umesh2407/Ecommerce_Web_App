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

const userRoute = require("./routes/user");
app.use("/api/user", userRoute);

const productRoute = require("./routes/product");
app.use("/api/product",productRoute);

app.get('/',(req, res)=>{
    res.send("Hello from Server!!! ")
})

module.exports = app;
