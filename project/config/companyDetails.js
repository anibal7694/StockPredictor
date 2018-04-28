var request = require('request');
var rp = require('request-promise');
var company = require('../models/companies')


var companies = ['Twitter', 'Amazon', 'Google', 'Microsoft', 'Apple', 'Facebook', 'Nvidia', 'Walmart', 'Target', 'SAP']
var stocks = ['TWTR','AMZN', 'GOOG', 'MSFT', 'AAPL', 'FB', 'NVDA', 'WMT', 'TGT', 'SAP'];

var path = ['images/'];
var fetch =function(){
    return new Promise((resolve,reject) =>{
        History.find({},{_id:0,__v:0},function(err, det){
        if(err) reject(err);
        else {
            resolve(det);
        }
        }).sort({date:1}); 
    });       
    
}

function queryExecutor(){

    for (let i = 0, p = Promise.resolve(); i < 10; i++) {
        p = p.then(_ => new Promise(resolve =>
            {
                let cmp = new company();
                cmp.companyName = companies[i];
                cmp.stockName = stocks[i];
                cmp.imageUrl = path+companies[i].toLowerCase()+'.png';
                console.log("here........................"+i);
                                
                company.findOne({ 'companyName' : cmp.companyName}, function(err, det){
                    if(err) return done(err);
                    if(!det) cmp.save();
                    resolve();
                });
            }
        ));
    }

}

/*
function queryExecutor(){
    var index = 0;

    function next(){
        if(index < companies.length){
            rp(companies[index])
                .then(function (result) {
                            let cmp = new company();
                            
                            cmp.companyName = companies[i];
                            cmp.stockName = stocks[i];
                            cmp.imageUrl = path+companies[i].toLowerCase()+'.png';
                            console.log("here........................");
                            
                            History.findOne({ 'companyName' : cmp.companyName}, function(err, det){
                                if(err) return done(err);
                                if(!det) oneDay.save();
                            });
                    
                    next();
                })
                .catch(function (err) {
                    console.log("here");
                });   
                index++;
        }
        else console.log("Done Uploading data");
    }
    next();
}
*/
module.exports= { queryExecutor }