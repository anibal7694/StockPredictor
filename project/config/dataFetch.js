var History = require('../models/historicalmodel');
var company = require('../models/companies');
var current = require('../models/currentmodel');

var hisDatafetch =function(){
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

var currDatafetch =function(dateObj){
    dateObj=JSON.parse(dateObj);
    console.log("date"+new Date(dateObj[0].date));
    let time=dateObj[0].date
    return new Promise((resolve,reject) =>{
        
        current.find({date:time},function(err, det){
        if(err) reject(err);
        else {
            resolve(det);
        }
        }).sort({date:-1}).limit(10); 
    });      
    //return {yeah:"yeah"}
}

module.exports = {hisDatafetch,cmpDetails,currDatafetch,dateFetch};