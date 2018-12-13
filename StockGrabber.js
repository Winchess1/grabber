
    const rp = require('request-promise');//take APIs +npm request
    const stockPriceNumberOfTrades =[];
    const stockPriceVolume =[];
    const stockPriceHigh =[];   
    const stockPriceLow =[];
    const stockPriceMinute =[];
    const EventEmitter = require('events');
    const myEmitter = new EventEmitter();
    const _ = require('underscore');       
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
            for(x in obj){
                filterStock[x] = obj[x].symbol;
            }      
            myEmitter.emit('newListener');
        })
        .catch(function(err){console.log("error")});

        var StockObj =0;
        var temp =[];
        var stockPrices = [];
        var combinedStockPrice = [];

        myEmitter.once('newListener',(event)=>{
            for (i=0;i<1;i++){ dataExtractor(i); }    
        });

function dataExtractor(i){

    var stockLink = ('https://api.iextrading.com/1.0/stock/'+filterStock[i]+'/chart/dynamic');
          
    const stockPrice = {
        url: stockLink,
        json:true,
        rejectUnauthorized: false,
        requestCert: true,
        agent: false
        } 
    
        rp(stockPrice)
        .then((data)=>{    
          temp = JSON.stringify(data);
          StockObj = JSON.parse(temp); 
          
          for(x in StockObj.data){
            stockPriceMinute.push(StockObj.data[x].minute);
            stockPriceNumberOfTrades.push(StockObj.data[x].numberOfTrades);
            stockPriceVolume.push(StockObj.data[x].volume);
            stockPriceHigh.push(StockObj.data[x].high);
            stockPriceLow.push(StockObj.data[x].low);
            
        }         
       
        
    })

       .catch(function(err){console.log("error")});

};





        exportise(stockPriceMinute, stockPriceNumberOfTrades, stockPriceVolume, stockPriceHigh, stockPriceLow);


  
function exportise (minute, NumberOfTrades, volume, high, low){ 
    module.exports.minute = minute;
    module.exports.NumberOfTrades = NumberOfTrades;
    module.exports.volume = volume;
    module.exports.high = high;
    module.exports.low = low;
    module.exports.allStocks = filterStock;
  //  module.exports.funcDataExtractor = dataExtractor();
    
};


