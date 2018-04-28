var request = require('request');
var rp = require('request-promise');

var companies = ['TWTR','AMZN', 'GOOG', 'MSFT', 'AAPL', 'FB', 'NVDA', 'WMT', 'TGT', 'SAP'];
var History = require('../models/historicalDataModel');

var urlRequests = [];

function createURL(){
    for(let i=0; i<companies.length; i++){
        let temp = {
            uri: 'https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol='+companies[i]+'&outputsize=full&datatype=json&apikey=67M5HDM0P13NRL8A',
            headers: {
                'User-Agent': 'Request-Promise'
            },
            json: true
        }
        urlRequests.push(temp);
        //console.log(urlRequests);
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
                    let data = result['Time Series (Daily)'];
                    for (const key in data) {
                        if (data.hasOwnProperty(key)) {
                            let oneDay = new History();
                            oneDay.company = metadata['2. Symbol'];
                            oneDay.date = key;
                            let details = data[key];
                            oneDay.open = details['1. open'];
                            oneDay.high = details['2. high'];
                            oneDay.low = details['3. low'];
                            oneDay.close = details['4. close'];
                            oneDay.volume = details['5. volume'];
                            History.findOne({ 'company' : oneDay.company,  'date' : key}, function(err, det){
                                if(err) return done(err);
                                if(!det) oneDay.save();
                            });
                        }
                    }
                    next();
                })
                .catch(function (err) {
                    console.log(err);
                });
        }
        else console.log("Done Uploading data");
    }
    next();
}

module.exports= {
    createURL, queryExecutor
}
