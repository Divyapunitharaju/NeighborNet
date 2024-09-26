const express =require('express')
const bcrypt = require('bcryptjs');
const generateToken =require('../utils/index')

const User = require('../model/index');



const router=express.Router()

router.get('/test',(req,res)=>{
    res.json({message:'API testing is successful'})
})

router.post('/user',async(req,res)=>{
   const {email,password}=req.body;

   const user = await User.findOne({email})

   if(!user){
       const hashedPassword=await bcrypt.hash(password,10)

       const newUser=new User({email,password:hashedPassword})
       
       await newUser.save();

       return res.status(201).json({message:"User created"})
   }
   res.status(404).json({message:"User already exist"})

})

router.post('/authenticate',async(req,res)=>{
        const {email,password}=req.body;

        const user=await User.findOne({email})

        if(!user){
            return res.status(404).json({message:"User not found"})
        }

        const token = generateToken(user)
})

module.exports=router