const { compare } = require('bcrypt');
const express=require('express');
const userModel = require('../models/userModel');
const protectRoute=require('../Routers/authHelper');
const jwt = require('jsonwebtoken');
const JWT_KEY='require("../secrets")';



const authRouter=express.Router();

authRouter
.route('/signup')
.get(getsignuppage)
.post(postsignup)

authRouter
.route('/login')
.post(login)

function getsignuppage(req,res){
    res.sendFile('public/sign.html',{root:__dirname})
}

async function postsignup(req,res){
    console.log(req.body);
    let user=req.body;
    await userModel.create(user);
    console.log('backend',user);
    res.json({
        mesage:"user signed up",
        user:req.body
    });
}

async function login(req,res){
    try{
    let data=req.body;
    let user=await userModel.findOne({email:data.email});
    if(user){
        //bcrypt -> compare 
        if(compare(data.password,user.password)){
            let uid=user['_id'];
            let token=jwt.sign({payload:uid},
                JWT_KEY,);
            res.cookie('login',token,{httpOnly:true});
            res.json({
                message:"user logged in successfully",
                userDetails:data,
            })
        }
        else{
            return res.json({
                message:"user not found",
            })
        }
    }
    else{
        return res.json({
            message:"user not found",
        })
    }

}
catch(err){
    console.log(err);
}
}

module.exports=authRouter;

