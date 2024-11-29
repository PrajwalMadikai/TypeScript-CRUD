let express=require('express')
let session=require('express-session')
let overRide=require('method-override')
let path=require('path')
let connectDB=require('./server/config/connectDB')
const app=express()
let userRoute=require('../server/route/user')
require('dotenv').config()
let port=4000;

connectDB();

app.use('views','ejs')
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use(session({
    secret:'secertkey',
    resave:false,
    saveUninitialized:false
}))
app.set('views',path.join(__dirname,'views'))

app.use('/',userRoute)


app.listen(port,()=>{console.log(`http://localhost:${port}`);})