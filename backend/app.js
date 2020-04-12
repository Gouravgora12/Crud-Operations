const express= require('express');
const bodyParser=require('body-parser');
const mongoose=require('mongoose')
const path =require('path');

var urll = require('url') ;
const userRoutes=require('./routes/user')
var cors=require('cors')
const url=`mongodb+srv://bunny:${process.env.pass}@cluster0-y59w4.mongodb.net/test?retryWrites=true&w=majority`;
const app=express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors())
//DataBase Connection
mongoose.connect(url).then(()=>{
    console.log("Connected to DataBase");
}).catch(()=>{
    console.log(error)
});
//End Point
app.use("/",express.static(path.join(__dirname,"angular")))
app.use('/api/people',userRoutes)
app.use('/api/remove',userRoutes);
module.exports=app;
app.use((req,res,send)=>{
       res.sendFile(path.join(__dirname,'angular','index.html'))
})