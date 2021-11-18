const router = require('express').Router()
const bcrypt= require('bcrypt')
const User =require('../models/User')

// register
router.post('/register',async (req,res)=>{
    try{
// generate new password
const salt = await bcrypt.genSalt(10)
const hashedPassword = await bcrypt.hash(req.body.password,salt)



// create new user
 const newUser = new User({
     username:req.body.username,
     email:req.body.email,
     password:hashedPassword
 })
// save and sho response
const user = await newUser.save()
res.status(200).json(user)
    }catch(err){
        res.status(500).json(err)
    }
})

// login
router.post('/login',async (req,res)=>{
    try{
// find user
 const user = await User.findOne({username:req.body.username})
 !user && res.status(400).json("Wrong username or Password")
// validate password
const validPassword=await bcrypt.compare(req.body.password,user.password)
!validPassword && res.status(400).json("Wrong username or Password")
// send response
res.status(200).json({_id:user._id,username:user.username})
    }catch(err){
        res.status(500).json(error)
    }
})
module.exports=router