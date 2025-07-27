const db = require("../config/db");

module.exports = function(app){

    // Help function to convert in to correct array for SQL queries
    function convToQueryArr(arr){
        const newArr = arr.map(val => `'${val}'`).join(",");
        return newArr;
    }

    // Get the products from data base and send it back to client
    app.get("/products", async(req,res)=>{
        try{
            // Checks if the paramers are empty or not
            const emptyItems = Object.values(req.query).every(
                value => value === '' || value === null || value === undefined || value === 'false' 
            );

            if(!emptyItems){
                const type = convToQueryArr(req.query.type.split(","));
                const stock = req.query.inStock;

                let query = ``;

                if(stock === 'true' || type.length > 1){
                    query = `SELECT * FROM stock`;
                    const stockData = await db.pool.query(query);
                    let id = [];
                    for(let i =0; i < stockData.length; i++){
                        id.push(stockData[i].Product_ID) ;
                    }

                    query = `SELECT * from product WHERE Basic_unit IN (${type}) OR ID IN(${id})`;
                    const data = await db.pool.query(query);
                    if(data.length === 0){
                        const result = await db.pool.query("SELECT * FROM product");
                        res.json(result);
                    }
                    else{
                        res.json(data);
                    }
                }
                else{
                    const result = await db.pool.query("SELECT * FROM product");
                    res.send(result);
                }
            }
            else{
                const result = await db.pool.query("SELECT * FROM product");
                res.send(result);
            }
        }  
        catch(error){
            throw error;
        }
    });

    app.get(`/products/:category`, async(req,res)=>{
        try{
            const result = await db.pool.query(`SELECT * FROM product WHERE Basic_unit='${req.params.category}'`);
            res.json(result)
        }
        catch(error){
            throw error;
        }
    });

    // Get a specific product and it's details for inspection of one item
    app.get(`/products/:category/:product`, async(req, res)=>{
        try{
            const result = await db.pool.query(`SELECT * FROM product WHERE Name='${req.params.product}'`);
            res.json(result);
        }
        catch(error){
            throw(error);
        }
    });
}
