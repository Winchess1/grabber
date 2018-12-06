const port = process.env.PORT || 3000;
const express = require('express');
const app = express();
const rp = require('request-promise');//take APIs +npm request
const _ = require('underscore');

app.set('view engine','ejs');

const jsdom = require('jsdom');
const {JSDOM} =jsdom;

const allStocks = {
url: `https://api.iextrading.com/1.0/ref-data/symbols`,
json:true,
rejectUnauthorized: false,
requestCert: true,
agent: false
}

var filterStock =[];
rp(allStocks) //Getting and Filtering all available stock from API and assign to filterstock variable
.then((data)=>{
    var filterType =_.filter(data,function(num){return num['type'] !== 'et'&&num['type'] !== 'N/A'});
    var counter = 0;
    var mass = JSON.stringify(filterType);
    var obj = JSON.parse(mass);    
    for(x in obj){++counter;}  
    for(var i =0;i<counter;i++){       
        filterStock[i] = obj[i].symbol;
    }
});


/* const stockPrice = {
    url: 'https://api.iextrading.com/1.0/stock/'+filterStock[0]+'/chart',
    json:true,
    rejectUnauthorized: false,
    requestCert: true,
    agent: false
    } */



app.get('/',(req,res,next)=>{
res.render('template',{filterStock:filterStock});
});






app.listen(port,console.log('server online'));
