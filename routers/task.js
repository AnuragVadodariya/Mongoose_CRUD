const express=require('express');
const Task=require('../models/task');

const router=express.Router();

//Add  Task Details Using POST

router.post('/tasks',async (req,res) => {
    const task=new Task(req.body);
    try{
        const ts=await task.save()
        res.send(ts)
    }catch(err) {
        res.status(500).send('server error')
    }
})

//Get All Tasks (completed:false)

router.get('/tasks',async (req,res) => {
    try{
        const findall=await Task.find({completed:false})
        res.send(findall)
    }
    catch(err){
        res.status(500).send('server Error')
    }
})

//Get Task By ID

router.get('/tasks/:id',async (req,res) => {
    const _id=req.params.id;
    try{
        const find_id=await Task.findById(_id);
        if(!find_id){
            return res.status(404).send('not found')
        }
        res.send(find_id)
    }catch(err){
        res.status(500).send('server error')
    }
})

//Update User By ID

router.patch('/tasks/:id',async (req,res) => {
    const _id=req.params.id;
    const keys=Object.keys(req.body);
    const ar=['dis','completed','priority'];

    const isvalid=keys.every((val) => ar.includes(val));

    if(!isvalid){
        return res.status(404).send('invalid keys')
    }

    try{
        const uptask=await Task.findByIdAndUpdate(_id,req.body,{new:true,renvalidators:true});
        res.send(uptask);
    }catch(err){
        res.status(500).send('server Error')
    }
})

//Delete Task By ID

router.delete('/tasks/:id',async (req,res) => {
    const _id=req.params.id;

    try{
        const taskdel=await Task.findByIdAndDelete(_id);
        if(!taskdel){
           return res.ststus(404).send('invalid id')
        }
        res.send(taskdel)
    }catch(err){
        res.status(500).send('server error');
    }
})

module.exports=router;