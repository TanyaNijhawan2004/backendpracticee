const express=require('express');
const userRouter=express.Router();
const protectRoute=require('../Routers/authHelper');
//require controller functions
const {getUsers,postUser,updateUser,deleteUser,getUserbyid,setCookies}=require('../controller/userController');
const userController=require('../controller/userController');
const { application } = require('express');

userRouter
.route('/')
.get(protectRoute,getUsers)
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

// let flag=true;


module.exports=userRouter; 