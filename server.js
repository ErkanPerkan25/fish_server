const express = require("express");
const app = express();
const port = 3000;
const bodyParser = require("body-parser");
//require("dotenv").config()

console.log(process.env)
app.use(bodyParser.json());


app.get("/", (req,res) =>{
    res.send("Hello World!");
})

app.listen(port, () =>{
    console.log(`Starting server on port ${port}`);
})
