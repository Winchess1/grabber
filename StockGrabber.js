
    const rp = require('request-promise');//take APIs +npm request
    const stockPriceOpen =[];
    const stockPriceClose =[];
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
            myEmitter.emit('newListener')
        })
        .catch(function(err){console.log("error")});

        var StockObj =0;
        var temp =[];
        var stockPrices = [];
        var combinedStockPrice = [];
        myEmitter.once('newListener',(event)=>{
            for (i=0;i<1;i++){
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
                    stockPriceOpen.push(StockObj.data[x].open);
                    stockPriceClose.push(StockObj.data[x].close);
                    stockPriceHigh.push(StockObj.data[x].high);
                    stockPriceLow.push(StockObj.data[x].low);
                    
                }         
               
                
            })

               .catch(function(err){console.log("error")});
        }
        
        
       
        });
        exportise(stockPriceMinute, stockPriceOpen, stockPriceClose, stockPriceHigh, stockPriceLow);


  
function exportise (minute, open, close, high, low){ 
    module.exports.minute = minute;
    module.exports.open = open;
    module.exports.close = close;
    module.exports.high = high;
    module.exports.low = low;

};
