const mongoose=require('mongoose');
const validator=require('validator');

const Friend=mongoose.model('user_info',{
    name:{
        type:String,
        trim:true,
        required:true
    },
    email:{
        type:String,
        trim:true,
        required:true,
        lowercase:true,
        validate(val){
            if(!validator.isEmail(val)){
                throw new Error('invalid Email');
            }
        }
    },
    password:{
        type:String,
        required:true,
        minlength:7
    },
    age:{
        type:Number,
        default:0,
        validate(val){
            if(val<0){
                throw new Error('Invalid Age')
            }
        }
    }
})

module.exports=Friend;