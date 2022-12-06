
const emailValidator=require('email-validator');
const mongoose=require('mongoose');
const bcrypt=require('bcrypt');

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

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        validate:function(){
            return emailValidator.validate(this.email);
        }
    },
    password:{
        type:String,
        required:true,
        maxLength:9,
    },
    confirmpassword:{
        type:String,
        required:true,
        maxLength:9,
        validate:function(){
            return this.confirmpassword=this.password;
    }
    },
    role:{
        type:String,
        enum:['admin','user','resturantowner','deliveryboy'],
        default:'user'

    },
    profileImage:{
        type:String,
        default:'img/users/default.jpg'
    },
});

//since confirm password is redundant data we need to remove the thing 
//and not get saved 
userSchema.pre('save',async function(done){
    this.confirmpassword=undefined;
    done();
    throw new Error('something went wrong');
})

userSchema.pre('save',async function(){
    let salt=await bcrypt.genSalt();
    let hashedString=await bcrypt.hash(this.password,salt);
    this.password=hashedString;
})

const userModel=new mongoose.model('userModel',userSchema);
module.exports=userModel;

// when we are signing up we need that before inserting to data 
//password and confirm passwordshould be samw
//implementing through hooks 

// userSchema.pre('save',function(){
//     console.log('before saving in database',this)
// })

// userSchema.post('save',function(doc){
//     console.log('after  saving in database',doc)
// })


//model ye schema kyu kaam ayega
//name , schema name 



//user 
// (async function createUser(){
//     let user={
//         name:'jasbir',
//         email:'abcd@gmail.com',
//         password:'123678893',
//         confirmpassword:'123678893',
//     };
//     let data=await userModel.create(user);
//     console.log(data);
// }
// )
// ();