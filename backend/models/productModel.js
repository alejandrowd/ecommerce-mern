const mongoose = require ('mongoose')

const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true, 'Please enter a product name.'],
        trim:true,
        maxLength:[100, 'Product name cannot exceed 100 characters']  
    },
    price:{
        type:Number,
        required:[true, 'Please enter a product price.'],
        maxLength:[5, 'Product price cannot exceed 5 characters'],
        default:0.0  
    },
    description:{
        type:String,
        required:[true, 'Please enter a product description.'],
    },
    ratings:{
        type:Number,
        default:0,

    },
    images:[
        {
            public_id:{
                type:String,
                required:true
            },
            url:{
                type:String,
                required:true
            }
        }
    ],
    category:{
        type:String,
        required:[true, 'Please select a category for this product'],
        enum:{
            values:[
                'Electronics',
                'Cameras',
                'Laptops',
                'Accessories',
                'Headphones',
                'Food',
                'Books',
                'Clothes/Shoes',
                'Beauty/Health',
                'Sports',
                'Outdoor',
                'Home'
            ],
            message:'please select a correct category for product'
        }
    },
    seller:{
        type:String,
        required:[true, 'Please enter product seller']
    },
    stock:{
        type:Number,
        required:[true, 'Please enter product stock'],
        maxLength:[5,'product stock value cannot exceed 5 character'],
        default:0
    },
    numOfReviews:{
        type:Number,
        default:0
    },
    reviews:[
        {
            user:{
                type:mongoose.Schema.Types.ObjectId,
                ref: 'User',
                required:true
            },
            name:{
                type:String,
                required:true
            },
            rating:{
                type:Number,
                required:true,
            },
            comment:{
                type:String,
                required:true
            }
        }
    ],
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required:false
    },
    CreatedAt:{
        type:Date,
        default: Date.now
    }

})


module.exports = mongoose.model('Product', productSchema)