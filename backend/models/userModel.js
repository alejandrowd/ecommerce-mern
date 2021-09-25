const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const crypto = require('crypto')

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,'Please enter your name'],
        maxLength:[30,'Your name cannot exceed 30 characters'],
        trim:true
    },
    email:{
        type:String,
        required:[true,'Please enter you email'],
        unique:true,
        lowercase:true,
        validate: [validator.isEmail, 'Please enter a valid email']
    },
    password:{
        type:String,
        required:true,
        trim:true,
        minlength:[6,'Your password must be longr than 6 characters'],
        select:false
    },
    avatar:{
        public_id:{
            type:String,
            required:true
        },
        url:{
            type:String,
            required:true
        }
    },
    role:{
        type:String,
        default:'user'
    },
    createdAt:{
        type:Date,
        default:Date.now
    },
    resetPasswordToken: String,
    resetPasswordExpire:Date

})


//Hash the plain password before saving
userSchema.pre('save', async function(next){
    const user = this
    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password,8)
    }

    next()
})

//Compare user password
userSchema.methods.comparePassword = async function(enteredPassword){
    const user = this
    return await bcrypt.compare(enteredPassword,user.password)
}

//generate Token
userSchema.methods.generateAuthToken = function(){
    const user = this
    // return jwt.sign({ id:user._id },process.env.JWT_SECRET,{expiresIn:process.env.JWT_EXPIRES_TIME})
    return jwt.sign({ id:user._id },process.env.JWT_SECRET)
}


// Generate password reset token
userSchema.methods.getResetPasswordToken = function(){
    //Generate Token
    const user = this
    const resetToken = crypto.randomBytes(20).toString('hex')

    // Hash and set the resetPasswordToken
    user.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex')

    // Set token expiration
    user.resetPasswordExpire = Date.now() + 30 * 60 * 1000

    return resetToken
}


module.exports = mongoose.model('User', userSchema)