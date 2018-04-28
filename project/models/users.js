var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');

var userSchema  = new Schema({
    email : {type: String, required:true},
    password : {type: String, required:true},
    username : {type: String, required:true},
    name : {type: String, required:true},
    active:{type: String},
    favourite_companies: [{ type: String }]
});

userSchema .methods.encryptPassword = function(password){
    return bcrypt.hashSync(password,bcrypt.genSaltSync(5),null);
};

userSchema .methods.validPassword = function(password){
    return bcrypt.compareSync(password,this.password);
};

module.exports = mongoose.model('User', userSchema );