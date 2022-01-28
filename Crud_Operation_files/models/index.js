var mongoose=require('mongoose');

var newSchema=mongoose.Schema({

    name:String,
    address:String,
    email:String,
    designation:String
});

module.exports=mongoose.model('employers',newSchema);