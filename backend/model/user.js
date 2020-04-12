var mongoose = require('mongoose');

var validateEmail = function(email) {
    var value = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return value.test(email)
};

const Schema =mongoose.Schema;
   const user=new Schema({
       fullName:{type:String,required:true,trim:true},
       city:{type:String,required:true},
       phoneNumber:{ type: String, required: false, validate: /^\d{10}$/ },
       email:{type:String,required:true,validate: [validateEmail]},
       password:{type:String,required:true},
   },{
       timestamps:true
    });
module.exports= mongoose.model('User',user);
