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


app.get('/',(req, res)=>{
    res.send("Hello from Server!!! ")
})

module.exports = app;
