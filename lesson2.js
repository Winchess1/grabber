const express = require('express');
const app = express();
const fs = require('fs');

app.set('view engine','ejs');


const stockGrabberDock = require("./StockGrabber"); //Data from StockGrabber
const minute = stockGrabberDock.minute;
const open = stockGrabberDock.open;
const close = stockGrabberDock.close;
const high = stockGrabberDock.high;
const low = stockGrabberDock.low;


app.get('/',(req,res)=>{    
  //  fs.writeFile('stock.log',patrice);   
  
    res.render('template',{minute:minute,
        open:open,
        close:close,
        high:high,
        low:low}); 

})









app.listen(port,console.log('server online'));	
