const db = require("../config/db");

module.exports = function(app){

    // Get the products from data base and send it back to client
    app.get("/products", async(req,res)=>{
        try{
            // Checks if the paramers are empty or not
            const emptyItems = Object.values(req.query).every(
                value => value === '' || value === null || value === undefined
            );

            if(emptyItems){
                const result = await db.pool.query("SELECT * FROM product");
                res.send(result);
            }

            else{
                const type = req.query.type;
                console.log(type);
                //const brand = req.query.brand;
                const data = await db.pool.query(`SELECT * from product WHERE Basic_unit IN ('${type}')`);
                res.send(data);
            }
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
