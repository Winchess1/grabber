
    const rp = require('request-promise');//take APIs +npm request
    var stockPriceNumberOfTrades =[];
            var stockPriceVolume =[];
            var stockPriceHigh =[];   
            var stockPriceLow =[];
            var stockPriceMinute =[];
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

        var stockObj =0;
        var temp =[];
        var stockPrices = [];
        var combinedStockPrice = [];

       

      const  dataExtractor = function (i){
console.log(i);
    var stockLink = ('https://api.iextrading.com/1.0/stock/'+i+'/chart/dynamic');
    console.log(stockLink);
          
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
          stockObj = JSON.parse(temp); 
         

            if(stockPriceMinute!=0){
                 stockPriceVolume =[];
                 stockPriceHigh =[];   
                 stockPriceLow =[];
                 stockPriceMinute =[]; 
                  stockPriceNumberOfTrades =[];
        }
          for(var x =0; x<stockObj.data.length; x++){    

            stockPriceMinute.push(stockObj.data[x].minute);
            stockPriceNumberOfTrades.push(stockObj.data[x].numberOfTrades);
            stockPriceVolume.push(stockObj.data[x].volume);
            stockPriceHigh.push(stockObj.data[x].high);
            stockPriceLow.push(stockObj.data[x].low);
            
          
        }       
        
       // console.log(stockPriceVolume);
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
    module.exports.funcDataExtractor = dataExtractor;
    
    
};


