const jwt =require('jsonwebtoken')
const User = require('../model')

const generateToken = ()=>jwt.sign({id:User.id},process.env.SECRET_KEY,{expiresIn:'2m'})

module.exports=generateToken