
    const rp = require('request-promise');//take APIs +npm request
    const stockPriceDate =[];
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

;        var StockObj =0;
        var temp =[];
        var stockPrices = [];
        var combinedStockPrice = [];
        myEmitter.once('newListener',(event)=>{

            for (i=0;i<10;i++){
            var stockLink = ('https://api.iextrading.com/1.0/stock/'+filterStock[i]+'/chart');
                
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
                  for(x in StockObj){
                    stockPriceDate.push("date" + StockObj[x].date,"price" + StockObj[x].close);
                }  
            
                combinedStockPrice.push(stockPriceDate);
                  
            })

               .catch(function(err){console.log("error")});
        }
        exportise(combinedStockPrice);
       
        });



  
function exportise (data){
 
    module.exports.log = data;

};
