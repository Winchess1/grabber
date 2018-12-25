
const port = process.env.PORT || 3000;
console.log('starting application', port);

const express = require('express');
const app = express();
const fs = require('fs');
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


app.get('/key', function (req, res) {


  if (typeof req.query.code === "undefined") {
    res.render('key');
    return;
  }
  var headers = {
    'Content-Type': 'application/x-www-form-urlencoded'
  }

  var options = {
    //see the Authentication API's Post Access Token method for more information
    url: 'https://api.tdameritrade.com/v1/oauth2/token',
    method: 'POST',
    headers: headers,
    //POST Body params
    form: {
      'grant_type': 'authorization_code',
      'access_type': 'offline',
      'code': req.query.code, //get the code
      'client_id': 'AMATUSEVSKI3@AMER.OAUTHAP',
      'redirect_uri': 'http://localhost:3000/key'
    }
  }

  console.log(options);


  //Post Access Token request
  request(options, function (error, response, body) {
    console.log(response);
    if (!error && response.statusCode == 200) {

      //see Post Access Token response summary for what authReply contains
      authReply = JSON.parse(body);

      //the line below is for convenience to test that it's working after authenticating
      res.render('key', { key: authReply });
    } else {
      res.render('key', { error: error, statusCode:response.statusCode, body:body  });

    }
  })

  function errorHandler(err, req, res, next) {
    res.status(500)
    res.render('error', { error: err })
  }
});





app.listen(port,console.log('server online'));	
