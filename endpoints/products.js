const db = require("../config/db");

module.exports = function(app){

    // Get the products from data base and send it back to client
    app.get("/products", async(req,res)=>{
        try{
            const result = await db.pool.query("Select * from product");
            res.send(result);
        }  
        catch(error){
            throw error;
        }
    });

    // Get a specific product and it's details for inspection of one item
    app.get(`/products/:productName`, async(req,res)=>{
        try{
            const result = await db.pool.query(`select ${req.params.productName} from product`);
            console.log(result);
        }
        catch(error){
            throw error;
        }
    });
}
