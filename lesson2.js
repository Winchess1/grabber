
const port = process.env.PORT || 3000;
const express = require('express');
const app = express();
const fs = require('fs');

app.set('view engine','ejs');


const stockGrabberDock = require("./StockGrabber"); //Data from StockGrabber
const minute = stockGrabberDock.minute;
const NumberOfTrades = stockGrabberDock.NumberOfTrades;
const volume = stockGrabberDock.volume;
const high = stockGrabberDock.high;
const low = stockGrabberDock.low;
const allStocks =stockGrabberDock.allStocks;
//const funcDataExtractor = stockGrabberDock.funcDataExtractor;


app.get('/',(req,res,next)=>{    
  //  fs.writeFile('stock.log',patrice);   
  res.render('main',{allStocks:allStocks,}); 

});

app.get('/stockGrabberDock/:id',(req,res,next)=>{        
    const id =req.params.id;
  //  console.log(typeof(funcDataExtractor.funcDataExtractor));
   // funcDataExtractor.funcDataExtractor(id);    
          res.render('template',{minute:minute,
          NumberOfTrades:NumberOfTrades,
          volume:volume,
          high:high,
          low:low}); 
          
  });





app.listen(port,console.log('server online'));	
