const express=require('express');
const Friend=require('../models/friends');
const router=express.Router();

//Get All Friends

router.get('/friends',async (req,res) => {
    try{
        const fd=await Friend.find({});
        res.send(fd);
    }catch(err){
        res.status(500).send('Server Error')
    }
})

//Get Friend By ID

router.get('/friends/:id',async (req,res) =>{
    try{
        const _id=req.params.id;
        const getid=await Friend.findById(_id);
        res.send(getid);
    }catch(err){
        res.status(500).send(err)
    }
})

//Add  Friend Details Using POST

router.post('/friends',async (req,res) => {
    const data=req.body;

    const addfriends=new Friend(data);

    try{    
        const addfr=addfriends.save();
        res.send(addfriends);
    }catch(err){
        res.status(500).send(err)
    }
})


//Update Friend By ID

router.patch('/friends/:id',async (req,res) => {
    const _id=req.params.id;
    const ar=['name','email','password','age'];
    const keys=Object.keys(req.body);
    
    const isvalid=keys.every((val) => ar.includes(val));
    
    if(!isvalid){
        return res.status(400).send('bad req')
    }
    try{
        const isupdate=await Friend.findByIdAndUpdate(_id,req.body,{new:true,runvalidator:true});
        
        res.send(isupdate);
        
    }catch(err){
        res.status(500).send(err)
    }
})


//Delete Friend By ID

router.delete('/friends/:id',async (req,res) => {
    const _id=req.params.id;
    try{
        const delById=await Friend.findByIdAndDelete(_id);
        res.send(delById)
    }catch(err){
        res.status(500).send('server error')
    }
})

module.exports=router;