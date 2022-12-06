//require dependicy downloaded
const express=require('express');
//invoke thos function in a instance or variable
const app=express();

app.listen(3500);

//routing
//1st param-route,callback function
app.get('/', (req, res)=>{
    res.sendFile('./views/index.html',{root:__dirname});
})

app.get('/about', (req, res)=>{
    // res.send('about')
    //file 
    res.sendFile('./views/about.html',{root:__dirname});
})

//redirect
app.get('/about-us', (req, res)=>{
    // res.send('about')
    //file 
    res.redirect('/about');
})

//404
app.use((req,res)=>{
    res.status(404).sendFile('./views/404.html',{root:__dirname});
})

//post-to send data from frontend to backend
