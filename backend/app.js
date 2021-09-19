const express = require ('express')
const cookieParser =require('cookie-parser')

const bodyparser = require('body-parser')
const fileUpload = require('express-fileupload')

const errorMiddleware = require ('./middlewares/errorMiddleware')

const app = express()

app.use(express.json())
app.use(bodyparser.urlencoded({extended:true}))
app.use(cookieParser())
app.use(fileUpload())




//import all routes
const products = require('./routes/productRoute')
const auth = require('./routes/authRoute')
const order = require('./routes/orderRoute')
const payment = require('./routes/paymentRoute')

app.use('/api/v1',products)
app.use('/api/v1',auth)
app.use('/api/v1',order)
app.use('/api/v1',payment)

//Middleware to handle errors
app.use(errorMiddleware)

module.exports = app