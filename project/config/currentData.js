var request = require('request');
var rp = require('request-promise');
var mongoose = require('mongoose');
var Current = require('../models/currentmodel')

var companies = ['TWTR','AMZN', 'GOOG', 'MSFT', 'AAPL', 'FB', 'NVDA', 'WMT', 'TGT', 'SAP'];

var urlRequests = [];

function createURL(){
    for(let i=0; i<companies.length; i++){
        let temp = {
            uri: 'https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol='+companies[i]+'&interval=1min&outputsize=compact&datatype=json&apikey=67M5HDM0P13NRL8A',
            headers: {
                'User-Agent': 'Request-Promise'
            },
            json: true
        }
        urlRequests.push(temp);
    }
    return urlRequests;
}


function queryExecutor(urls){
   
    
    var index = 0;

    function next(){
        if(index < urls.length){
            rp(urls[index++])
                .then(function (result) {
                    let metadata = result['Meta Data'];
                    let data = result['Time Series (1min)'];
                    for (const key in data) {
                        if (data.hasOwnProperty(key)) {
                            let oneDay = new Current();
                            oneDay.company = metadata['2. Symbol'];
                            oneDay.date = key;
                            let details = data[key];
                            oneDay.open = details['1. open'];
                            oneDay.high = details['2. high'];
                            oneDay.low = details['3. low'];
                            oneDay.close = details['4. close'];
                            oneDay.volume = details['5. volume'];
                            oneDay.save().then(function(a){
                            }).catch(function(err){
                                //console.log('Data is already present');
                            });
                        }
                    }
                    next();
                })
                .catch(function (err) {
                    console.log('API is currently getting updated');
                });   
        }
        else console.log("Done Uploading data");
    }
    next();
}

module.exports= {
    createURL, queryExecutor
}

//queryExecutor(urlRequests);