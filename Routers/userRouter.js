const express=require('express');
const userRouter=express.Router();

userRouter
.route('/')
.get(getUsers)
.post(postUser)
.patch(updateUser)
.delete(deleteUser)

userRouter
.route('/:id')
.get(getUserbyid)

userRouter
.route('/getcookies')
.get(getcookies)

userRouter
.route('/setcookies')
.get(setCookies)

async function getUsers(req,res){
    let allUsers=await userModel.find();
    res.json({message:'list of all users ', 
    data:allUsers});
};



async function postUser(req,res){
    let user=req.body;
    await userModel.create(user);
    console.log('backend',user);
    res.json({
        mesage:"user signed up",
        user:req.body
    });
};

async function updateUser( req,res){
        console.log('req->body',req.body);
        let datatobeupdated=req.body;
        let user=await userModel.findOneAndUpdate({email:'abc@gmail.com'},datatobeupdated);
        // for(key in datatobeupdated){
        //     users[key]=datatobeupdated[key];
        // }
        res.json({
            message:"data updates"
        })
}

async function deleteUser(req,res){        
        let user=await userModel.findOneAndDelete({email:'abc@gmail.com'})
        res.json({
            messsage:"data has been deleted",
            data:user
        });
}

function getUserbyid(req,res){
    console.log(req.params.id);
    let paramId=req.params.id;
    let obj={};
    for(let i=0;i<users.length;i++){
        if(users[i]['id']==paramId){
            obj=users[i];
        }
    }
    res.json({
        message:'req recieved',
        data:obj
    })
}

function setCookies(req,res){
    res.cookie('isLoggedIn',true,{maxAge:1000*60*60*24,secure:true,httpOnly:true});
    res.cookie('isPrimeMember',true)
    res.send('cookies has been set');
}

function getcookies(req,res){
    let cookies=req.cookies.isLoggedIn;
    console.log(cookies);
    res.send('cookies recieved')
}

module.exports=userRouter;