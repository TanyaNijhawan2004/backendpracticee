//server creation 
//using node

//1. http modules require 
// reqire fs module to read file 
const { Console } = require('console');
const http=require('http');
const fs=require('fs'); 
const _=require('lodash');


const server=http.createServer((req,res)=>{
    console.log("request has been made from server browser to server");
    // console.log(req.method);
    // console.log(req.url);
//lodash 
    
let num=_.random(0,20);
console.log(num);

function greet(){
    console.log('helllo');
}
greet();
greet();

    res.setHeader('Content-type','text/html');
    // res.write("hello welcome");
    // res.end();

    //path define

    let path='./views';
    switch(req.url){
        case '/':
            path+="/index.html"
            res.statusCode=200;
            break;
        case '/about':
            path+="/about.html"
            res.statusCode=200;
            break;
        case '/about-me':
            //res.setheader('localhost',loaction)
            res.setHeader('localhost','/about');
            res.end();
            res.statusCode=301;
            break;
        default:
            path+="/404.html"
            res.statusCode=404;
            break;
    }

// to read file using path 
    
    fs.readFile(path,(err,file)=>{
        if(err){
            console.log(err);
        }
        else{
            // res.write(filedata);
            res.end();
        }
    })

    // fs.readFile('./views/index.html',(err,file)=>{
    //     if(err){
    //         console.log(err);
    //     }
    //     else{
    //         res.write(filedata);
    //         res.end();
    //     }
    // })
})

server.listen(3000,'localhost',()=>{
    console.log("server started at 3000 local host ")
})
