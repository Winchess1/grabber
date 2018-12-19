console.log('\tloading module Stock Grabber')

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
        console.log('\tloading symbols ');

        var filterStock =[];
        rp(allStocks) //Getting and Filtering all available stock from API and assign to filterstock variable
        .then((data)=>{
            console.log('\tsymbols loaded', data.length);
            var filterType =_.filter(data,function(num){return num['type'] !== 'et'&&num['type'] !== 'N/A'});
            console.log('\tfiltered symbols', filterType.length);

            var counter = 0;
            var mass = JSON.stringify(filterType);
            var obj = JSON.parse(mass);    
            for(x in obj){
                filterStock[x] = obj[x].symbol;
            }
            console.log('\tfilterStock filled', filterStock.length);
            console.log('\tfemit newListener event');
            myEmitter.emit('newListener');
            console.log('\tfemit newListener event END');
        })
        .catch(function(err){console.log("error")});
        console.log('\tloading symbols END');

        var stockObj =0;
        var temp =[];
        var stockPrices = [];
        var combinedStockPrice = [];

       

      const  dataExtractor = function (i, render){

    console.log('\t\tfunc dataExtractor(', i, ')');
    var stockLink = ('https://api.iextrading.com/1.0/stock/' + i + '/chart/dynamic');
    console.log('\t\tfunc dataExtractor', stockLink);
    var stockLink = ('https://api.iextrading.com/1.0/stock/'+i+'/chart/dynamic');
    console.log(stockLink);
          
    const stockPrice = {
        url: stockLink,
        json:true,
        rejectUnauthorized: false,
        requestCert: true,
        agent: false
        } 
        console.log('\t\tfunc dataExtractor requesting ', stockLink);

        rp(stockPrice)
        .then((data)=>{    
          console.log('\t\tfunc dataExtractor requesting DONE');
          temp = JSON.stringify(data);          
          console.log('\t\tfunc dataExtractor requested:', temp.slice(0, 10));
          stockObj = JSON.parse(temp); 
         

            if(stockPriceMinute!=0){
                 stockPriceVolume =[];
                 stockPriceHigh =[];   
                 stockPriceLow =[];
                 stockPriceMinute =[]; 
                  stockPriceNumberOfTrades =[];
        }
            if (typeof (stockObj.data) === "undefined") {
                console.log('\tthe data for', i, 'is undefinde');
                render([],[],[],[],[]);
                return;
            }

            console.log('\t\tfunc dataExtractor filling arrays', stockObj.data.length);

          for(var x =0; x<stockObj.data.length; x++){    

            stockPriceMinute.push(stockObj.data[x].minute);
            stockPriceNumberOfTrades.push(stockObj.data[x].numberOfTrades);
            stockPriceVolume.push(stockObj.data[x].volume);
            stockPriceHigh.push(stockObj.data[x].high);
            stockPriceLow.push(stockObj.data[x].low);
            
          
        }
        console.log('\t\tfunc dataExtractor filling arrays END', stockObj.data.length);

        
       // console.log(stockPriceVolume);
        // CALL Template Render
        console.log('\t\tCall Render Function');
        render(stockPriceVolume,
            stockPriceHigh,
            stockPriceLow,
            stockPriceMinute,
            stockPriceNumberOfTrades);
        console.log('\t\tCall Render Function END');
    })

        .catch(function (err) {
            console.log('\t\tfunc dataExtractor', err)
        });

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

console.log('\tloading module Stock Grabber END')

