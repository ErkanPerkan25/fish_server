const express = require("express");
const app = express();
const port = 3000;
const cors = require("cors");
//require("dotenv").config()

app.use(express.json());
app.use(express.urlencoded({extended: false}))

app.use(cors({
    origin: ["http://localhost:5173"],
    credentials: true
}));

const products = require("./endpoints/products");
products(app);

app.get("/", (req,res) =>{
    res.send("Hello World!");
});


app.listen(port, () =>{
    console.log(`Starting server on port ${port}`);
});
