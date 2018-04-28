var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var companies = new Schema({
    companyName: { type: String, required: true },
    stockName : {type: String, required: true},
    imageUrl : {type: String, required: true}  
});

module.exports = mongoose.model('company', companies);