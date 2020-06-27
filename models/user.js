const mongoose=require('mongoose');
const validator=require('validator');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');

const userScherma= new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        trim:true,
        lowercase:true,
        unique:true,
        validate(val){
            if(!validator.isEmail(val)){
                throw new Error('invalid Email')
            }
        }
    },
    password:{
        type:String,
        required:true,
        trim:true,
        minlength:7
    },
    city:{
        type:String,
        trim:true
    },
    tokens:[{
        token:{
            type:String,
            required:true
        }
    }]
    
});

// password hashing
userScherma.pre('save',async function(next){
    const info=this;
    if(info.isModified('password')){
        info.password=await bcrypt.hash(info.password,8);
    }
})

const User=mongoose.model('customer-info',userScherma);

module.exports=User;