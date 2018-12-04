const express = require('express');
const app = express();
const temp = require('./calculator');
const _ = require('underscore');
const fs = require('fs');

const EventEmmiter = require('events');
const emmitter = new EventEmmiter();

const rp = require('request-promise');//take APIs +npm request
const jsdom = require("jsdom"); 
const $ = require('jquery')(new jsdom.JSDOM().window);//npm jquere and jsdom

const table = require('cli-table');

const options = {
url: `https://api.iextrading.com/1.0/ref-data/symbols`,
json:true,
rejectUnauthorized: false,
requestCert: true,
agent: false
}

var stock = [];

app.get('/',(req,res,next)=>{
res.writeHead(200,{'Content-Type':'text/html'});
var myReadStream = fs.createReadStream(__dirname+'/index.html','utf8');
emmitter.emit('messageLogged');    
myReadStream.pipe(res);

});
emmitter.on('messageLogged',function(){
    rp(options)
    .then((data)=>{          
   var filtered =_.filter(data,function(num){return num['type'] !== 'et'&&num['type'] !== 'N/A'});
console.log(typeof(filtered));

$(".addStock").innerHTML= JSON.stringify(filtered);
    })
   .catch((err)=>{console.log(err)});  

});


app.listen(3000);
