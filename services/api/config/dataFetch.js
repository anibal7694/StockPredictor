//var History = require('../../server');
var History = require('../models/historicalDataModel');
var company = require('../models/userCompanyModel').Company;

var hisDatafetch =function(){
  console.log(typeof History);
    return new Promise((resolve,reject) =>{
        History.find({},{_id:0,__v:0},function(err, det){
        if(err) reject(err);
        else {
            resolve(det);
        }
        }).sort({date:1});
    });

}

var cmpDetails =function(){
    return new Promise((resolve,reject) =>{
        company.find({},{_id:0,__v:0},function(err, det){
            if(err) reject(err);
            else {
                resolve(det);
            }
            })
    });

}

var dateFetch =function(){
    return new Promise((resolve,reject) =>{

        current.find({},function(err, det){
        if(err) reject(err);
        else {
            resolve(det);
        }
        }).sort({date:-1}).limit(1);
    });

}



module.exports = {hisDatafetch,cmpDetails,dateFetch};
