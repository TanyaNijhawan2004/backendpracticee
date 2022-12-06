const express=require('express');
const authRouter=express.Router();

authRouter
.route('/signup')
.get(getsignuppage)
.post(postsignup)

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

module.exports=authRouter;

