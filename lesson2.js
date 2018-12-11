const port = process.env.PORT || 3000;
const express = require('express');
const app = express();
const fs = require('fs');

app.set('view engine','ejs');


const patrice = require("./StockGrabber"); //Data from StockGrabber


app.get('/',(req,res)=>{    
  //  fs.writeFile('stock.log',patrice);   
    res.render('template',{stockPrices:patrice.log}); 

})







app.listen(port,console.log('server online'));	
