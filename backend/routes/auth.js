const express = require('express')
const router = express.Router()
const User = require('../models/User')
const{body , valdiationResult ,validationResult } = require('express-validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const JWT_SECRET = 'hehe'
var fetchUser = require('../middleware/fetchUser')

// create a user with post no authentication require
router.post('/createuser', [
    body('name' , 'Enter a valid name').isLength({min:3}),
    body('password','Password must be atleast of 5 words').isLength({min:5}),
    body('email','Enter a valid email').isEmail(),


], async (req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})

    }
    try {
        
    
    let user = await User.findOne({email:req.body.email})
    if(user){
        return res.status(400).json({error:'this user already exists'})

    }
    const salt = await bcrypt.genSalt(10)
    const secPass = await bcrypt.hash(req.body.password , salt)

    user = await User.create({
        name:req.body.name,
        email:req.body.email,
        password:secPass,
    })

    const data = {
        user:{
            id:user.id
        }
    }
    const authtoken = jwt.sign(data,JWT_SECRET);
    console.log(authtoken)
    res.json({authtoken})

    } 
    catch (error) {
            console.error(error.messsage);
            res.status(500).send("Internal server error")
    }
})

//  authentication  login 

router.post('/login', [
    body('email','Enter a valid email').isEmail(),
    body('password','Password cannot be blank').exists(),


], async (req,res)=>{
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})

    }
    const {email , password} = req.body;

    try {
        let user = await User.findOne ({email});
        if(!email){
            return res.status(400).json({error: "please enter the correct credientials"})
        }
        
        const passcompare = await bcrypt.compare(password , user.password)
        if(!passcompare){
            return res.status(400).json({error: "please enter the correct credientials"})
            
        }
        const data = {
            user:{
                id:user.id
            }
        }
        const authtoken = jwt.sign(data,JWT_SECRET);
        res.json({authtoken})
    
    }
    catch (error) {
        console.error(error.messsage);
        res.status(500).send("Internal server error")
    }
})

 
// get user after login

router.post('/getuser', fetchUser , async (req , res) =>{
    try{
        userId = req.user.id;
        const user = await User.findById(userId).select("-password")
        res.send(user)
    }
    catch(error){
        console.error(error.messsage);
        res.status(500).send("Internal server error")
    }
})

module.exports = router