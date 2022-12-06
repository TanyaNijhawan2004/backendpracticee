//require dependicy downloaded
const express=require('express');
const userModel=require('./models/userModel');
const cookieParser=require('cookie-parser');
const { result, create, reverse } = require('lodash');
const bodyParser = require('body-parser');
const emailValidator=require('email-validator');
const protectRoute=require('./Routers/authHelper');


//invoke thos function in a instance or variable
const app=express();
const mongoose=require('mongoose');
//middleware=>post , to convert to json 
app.use(bodyParser.urlencoded({
    extended: false
  }))
app.use(bodyParser.json())
app.use(express.json());
app.use(cookieParser());
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
const userRouter=require('./Routers/userRouter')
const authRouter=require('./Routers/authRouter')
app.use('/user',userRouter);
app.use('/auth',authRouter);




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

