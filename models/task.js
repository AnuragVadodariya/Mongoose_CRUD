const mongoose=require('mongoose');
const validator=require('validator');

const Task=mongoose.model('task',{
    dis:{
        type:String,
        trim:true,
        reqiured:true
    },
    priority:{
        type:Number,
        trim:true
    },
    completed:{
        type:Boolean,
        default:false,
        trim:true
    }
});

module.exports=Task;