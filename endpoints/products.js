const db = require("../config/db");

module.exports = function(app){

    // Get the products from data base and send it back to client
    app.get("/products", async(req,res)=>{
        try{
            const {type, brand} = req.query;
            console.log(type + "\n" + brand);
            const result = await db.pool.query("Select * from product");
            res.send(result);
        }  
        catch(error){
            throw error;
        }
    });

    // Get a specific product and it's details for inspection of one item
    app.get(`/products/:name`, async(req,res)=>{
        try{
            const result = await db.pool.query(`SELECT * FROM product WHERE Name='${req.params.name}'`);
            res.send(result);
        }
        catch(error){
            throw error;
        }
    });
}
