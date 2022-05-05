//external imports
const express = require('express')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const morgan = require('morgan')
const path = require('path')
const cookieParser = require('cookie-parser')

// internal imports
const {
    notFoundHandler,
    errorHandler
} = require('./middleware/common/errorHandler')
const userRouter = require('./router/userRouter')
const inboxRouter = require('./router/inboxRouter')
const loginRouter = require('./router/loginRouter')

const app = express() 

//dot env configaration
dotenv.config();

// middleware use
app.use(morgan('dev'))


//database connection 
mongoose.connect(process.env.MONGO_CONNECTION_STRING,{
    useNewUrlParser: true,
    useUnifiedTopology:true
})
.then(() =>console.log(`database is connected`))
.catch(err => console.log(err))


//request parser 
app.use(express.urlencoded({extended:true}))
app.use(express.json())  


// set view engine  
app.set('view engine','ejs') 

//static folder 
app.use(express.static(path.join(__dirname,'public')))

//parse cookies
app.use(cookieParser(process.env.COOKIE_SECRET))


//routing pages
app.use('/users',userRouter)
app.use('/inbox',inboxRouter)
app.use('/',loginRouter)

//404 not found handler
app.use(notFoundHandler)

//common error handler
app.use(errorHandler)





// app listening
app.listen(process.env.PORT,() =>{
    console.log(`listening port ${process.env.PORT}`)
})
