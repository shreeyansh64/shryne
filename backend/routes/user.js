const exp = require('express');
const router = exp.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const JWT_SECRET = require('../config');
const zod = require('zod');
const User = require('../db')


const signupSchema = zod.object({
    username:zod.string(),
    password:zod.string()
})

const signinSchema = zod.object({
    username:zod.string(),
    password:zod.string()
})


router.post('/signup', async (req,res)=>{
    const body = req.body;
    const {success} = signupSchema.safeParse(req.body);
    if(!success){
        return res.json({
            message: "Invalid input."
        })
    }

    const user = await User.findOne({username:body.username});
    if(user){
        return res.json({message: "User already exists."})
    }

    const hashedpass = await bcrypt.hash(body.password,10);

    const dbUser = await User.create({...body,password:hashedpass});

    const token = jwt.sign({userId:dbUser._id , username:body.username},JWT_SECRET)

    res.status(200).json({
        message: "Account Created.",
        token : token
    })

})

router.post('/signin',async (req,res)=>{
    const body = req.body;
    const {success} = signinSchema.safeParse(req.body);
    if(!success){
        return res.json({
            message: "Invalid input"
        })
    }

    const user = await User.findOne({username:body.username});
    if(!user){
        return res.json({
            message: "Invalid username or password."
        })
    }

    const checkpass = await bcrypt.compare(body.password,user.password);
    if(!checkpass){
        return res.json({
            message: "Invalid username or password."
        })
    } 

    const token = jwt.sign({userId:user._id,username:body.username},JWT_SECRET);

    res.status(200).json({
        message:"Logged in successfully",
        token:token
    })
})

module.exports = router;