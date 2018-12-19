
const port = process.env.PORT || 3000;
console.log('starting application', port);

const express = require('express');
const app = express();
const fs = require('fs');

app.set('view engine','ejs');


console.log('loading stock grabber module');
const stockGrabberDock = require("./StockGrabber"); //Data from StockGrabber
console.log('loading stock grabber module END');

var minute = stockGrabberDock.minute;
var NumberOfTrades = stockGrabberDock.NumberOfTrades;
var volume = stockGrabberDock.volume;
var high = stockGrabberDock.high;
var low = stockGrabberDock.low;

const allStocks =stockGrabberDock.allStocks;
const funcDataExtractor = stockGrabberDock.funcDataExtractor;


app.get('/',(req,res,next)=>{    
  console.log('\napp:', req.path);
  //  fs.writeFile('stock.log',patrice);   
  console.log('app.render', allStocks.length);
  res.render('main', { allStocks: allStocks, });
  console.log('app.render END');

});

app.get('/stockGrabberDock/:id',(req,res)=>{        
    function render(stockPriceVolume,
    stockPriceHigh,
    stockPriceLow,
    stockPriceMinute,
    stockPriceNumberOfTrades) {
    console.log('app.render.template data', minute.length);

    res.render('template', {
      minute: stockPriceMinute,
      NumberOfTrades: stockPriceNumberOfTrades,
      volume: stockPriceVolume,
      high: stockPriceHigh,
      low: stockPriceLow
    }
    );
    console.log('app.render.template END');

  }

  console.log('\napp:', req.path);
  const id = req.params.id;
  const funcStock = funcDataExtractor(id, render)
  console.log('data extraction end', id);

         
          
          
  });







app.listen(port,console.log('server online'));	
