
const port = process.env.PORT || 3000;
console.log('starting application', port);

const express = require('express');
const app = express();
const fs = require('fs');
const tda = require('./tda');

var request = require('request');

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

// to create or view access keys
app.get('/key', function (req, res) {

  // if we don't have the key in query string - that means we just opened it
  if (typeof req.query.code === "undefined") {
    var accessKey = tda.getAccessKey();
    res.render('key', { key: accessKey, require });
    return;
  }

  // requesting the access key
  tda.requestToken(req.query.code,(error, accessKey)=>{
    if (error == null) {
      res.redirect('/key')
    } else {
      res.render('key', { error: error.error, statusCode: error.statusCode, body: error.body, require });
    }
  })
});

app.get('/price/:symbol', function (req, res) {
  const symbol = req.params.symbol;
  tda.getPriceHistory(symbol, 'day', '2', '1', 'minute', true, function(error, data){
    if (error){
      res.render('price', { error: error, require });
    } else{
      res.render('price', { data: data, require });
    }
  });
});





app.listen(port,console.log('server online'));	
