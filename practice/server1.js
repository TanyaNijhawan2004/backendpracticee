//require dependicy downloaded
const express=require('express');
const { result } = require('lodash');
//invoke thos function in a instance or variable
const app=express();
const mongoose=require("mongoose");
//middleware=>post , to convert to json 
app.use(express.json());
app.listen(3500);


const db_link='mongodb+srv://tanya:tanya@cluster0.gevzwb3.mongodb.net/?retryWrites=true&w=majority'
mongoose.connect(db_link)
.then(function(db){
    //console.log(db)
    console.log('db connected')
})
.catch(function(err){
    console.log(err);
});

//scheme of a user on signup page
// how should it look like 
const userSchema=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        minLength:9,
    },
    confirmpassword:{
        type:String,
        required:true,
        minLength:9
    }
})

//model ye schema kyu kaam ayega
//name , schema name 
const userModel=mongoose.model('userModel',userSchema);

//user 
(async function createUser(){
    let user={
        name:'tanya',
        email:'tanya@gmail.com',
        password:'890763212',
        confirmpassword:'890763212',
    };
    let data=await userModel.create(user);
    console.log(data);
}
)
();


async function getUsers(req,res){
    let allUsers=await userModel.find();
    res.json({message:'list of all users ', 
    data:allUsers});
};
