const express =require('express')
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

       return res.json(201).json({message:"USer created"})
   }
   res.status(404).json({message:"User already exist"})

})

module.exports=router