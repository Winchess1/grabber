
const port = process.env.PORT || 3000;
const express = require('express');
const app = express();
const fs = require('fs');

app.set('view engine','ejs');


const stockGrabberDock = require("./StockGrabber"); //Data from StockGrabber

var minute = stockGrabberDock.minute;
var NumberOfTrades = stockGrabberDock.NumberOfTrades;
var volume = stockGrabberDock.volume;
var high = stockGrabberDock.high;
var low = stockGrabberDock.low;

const allStocks =stockGrabberDock.allStocks;
const funcDataExtractor = stockGrabberDock.funcDataExtractor;


app.get('/',(req,res,next)=>{    
  //  fs.writeFile('stock.log',patrice);   
  res.render('main',{allStocks:allStocks,}); 

});

app.get('/stockGrabberDock/:id',(req,res)=>{        
    const id =req.params.id;
    const funcStock =  funcDataExtractor(id)
    //console.log(NumberOfTrades);
          res.render('template',{minute:minute,
          NumberOfTrades:NumberOfTrades,
          volume:volume,
          high:high,
          low:low}); 

         
          
          
  });







app.listen(port,console.log('server online'));	
