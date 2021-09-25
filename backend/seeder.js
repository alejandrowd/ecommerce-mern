const Product = require('./models/productModel')
const fs = require('fs')
const dotenv = require('dotenv')
const connectDatabase = require ('./config/db')





//Setting dotenv files

dotenv.config({path:'backend/config/config.env'})

connectDatabase()

const products = JSON.parse(fs.readFileSync(`${__dirname}/data/products.json`, 'utf-8'))

const seedProducts = async()=>{
    try{
        await Product.deleteMany()
        console.log('Products are deleted')
        await Product.insertMany(products)
        console.log('Products were added')
        process.exit()
    }catch(error){
        console.log(error.message)
        process.exit()
    }
}

seedProducts()