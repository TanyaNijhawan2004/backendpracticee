//require dependicy downloaded
const express=require('express');
const userModel=require('./models/userModel')
const { result } = require('lodash');
const bodyParser = require('body-parser');
const emailValidator=require('email-validator');


//invoke thos function in a instance or variable
const app=express();
const mongoose=require('mongoose');
//middleware=>post , to convert to json 
app.use(bodyParser.urlencoded({
    extended: false
  }))
app.use(bodyParser.json())
app.use(express.json());
app.listen(3500);

//objects
let users=[
    {
        'id':1,
        'name':'abhisek'
    },
    {
        'id':2,
        'name':'tanya'
    },
    {
        'id':3,
        'name':'softy'
    }
]

//miniapp
const userRouter=express.Router();
const authRouter=express.Router();
app.use('/user',userRouter);
app.use('/auth',authRouter);
userRouter
.route('/')
.get(getUsers)
.post(postUser)
.patch(updateUser)
.delete(deleteUser)

userRouter
.route('/:id')
.get(getUserbyid)

authRouter
.route('/signup')
.get(getsignuppage)
.post(postsignup)

userRouter
.route('/getcookies')
.get(getcookies)

userRouter
.route('/setcookies')
.get(setcookies)

// app.get('/user',(req,res)=>{

//     console.log(req.query);
//     res.send(users);
// })

// app.get('/user');

// app.post('/user',(req,res)=>{
//     console.log(req.body);
//     users=req.body;
//     res.json({
//         message:"data has been sent succesfully",
//         user:req.body

//     });

// })

// app.post('/user');

// app.patch('/user',(req,res)=>{
//     console.log('req->body',req.body);
//     let datatobeupdated=req.body;
//     for(key in datatobeupdated){
//         users[key]=datatobeupdated[key];
//     }
//     res.json({
//         message:"data updates"
//     })

// })
// app.patch('/user');

// app.delete('/user',(req,res)=>{
//     users={};
//     res.json({
//         messsage:"data has been deleted"
//     });
// })

// app.delete('/user');

//particular user


// app.get('/user/:id',(req,res)=>{
//     console.log(req.params.id);
//     res.send("user id is ",req.params)
// })



async function getUsers(req,res){
    let allUsers=await userModel.find();
    res.json({message:'list of all users ', 
    data:allUsers});
};



function postUser(req,res){
        console.log(req.body);
        users=req.body;
        res.json({
            message:"data has been sent succesfully",
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

function getsignuppage(req,res){
    res.sendFile('public/sign.html',{root:__dirname})
}

async function postsignup(req,res){
    let dataobj=req.body;
    let user=await userModel.insertMany(dataobj);
    console.log('backend',user);
    res.json({
        mesage:"user signed up",
        data:user
    });
}

function setcookies(req,res){
    res.setHeader('Set-cookies','isLoggedIn=true');
    res.send('cookies has been set');
}

function getcookies(req,res){
    
}
