const express =require('express')
const bcrypt = require('bcryptjs');
const generateToken =require('../utils/index')
const nodemailer=require('nodemailer')

const User = require('../model/index');
const verifyToken = require('../middleware/index');



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
        res.json({token});
})

router.get('/data',verifyToken,(req,res)=>{
    res.json({message:`Welcome,${req.user.email} ! This is protected data`})
}

);

router.post('/reset-password',async(req,res)=>{
    const {email}=req.body;

    const user =await User.findOne({email})

    if(!user){
        return res.status(404).json({message : "USer not found"
        })
    }
    const token =Math.random().toString(36).slice(-8)
    user.resetPasswordToken =token;
    user.resetPasswordExpires=Date.now()+3600000


    await user.save();

    const transporter = nodemailer.createTransport(
        {
            servicec:"gmail",
            auth:{
                user:"divya04gmail.com",
                pass:""
            }
        }
    )
})


module.exports=router