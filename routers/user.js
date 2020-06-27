const express=require('express');
const User=require('../models/user');

const router=express.Router();

//Add  User Details Using POST

router.post('/users',async (req,res) => {
    const user=new User(req.body);
    try{
        const us=await user.save();
        if(!us){
            return res.status(404).send('invalid user info..')
        }
        const token=await user.generateToken();    
        res.send({user,token})
    }catch(err){
        res.status(500).send(err)
    }
});

//Get All Users

router.get('/users',async (req,res) => {
    try{
        const us=await User.find({});
        if(!us){
           return res.status(404).send('no match');
        }
        res.send(us)
    }catch(err){
        res.status(500).send(e)
    }
})

//Get User By ID

router.get('/users/:id',async (req,res) => {
    const _ids=req.params.id;
    try{
        const findid=await User.findById(_ids);
        res.send(findid);
    }catch(err){
        res.status(500).send('server Error')
    }
})

//Update Task By ID

router.patch('/users/:id',async (req,res) => {
    const _id=req.params.id;
    const keys=Object.keys(req.body);
    const ar=['name','email','password','city'];

    const isvalid=keys.every((up) => ar.includes(up))

    if(!isvalid){
        return res.status(400).send('invalid keys')
    }

    try{
        //const up=await User.findByIdAndUpdate(_id,req.body,{new:true,runvalidators:true});
        const user=await User.findById(_id);
        keys.forEach((val) => user[val] = req.body[val]);
        await user.save()
        res.send(user)
    }catch(err) {
        res.status(500).send('server error')
    }
})

//Delete User By ID

router.delete('/users/:id',async (req,res) => {
    const _id=req.params.id;
    try{
        const del=await User.findByIdAndDelete(_id);
        if(!del){
            return res.status(400).send('invalid id')
        }
        res.send(del)
    }catch(err){
        res.status(500).send('server error')
    }
})

module.exports=router;