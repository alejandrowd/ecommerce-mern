const ErrorHandler = require('../utils/errorHandler')


module.exports = (err,req,res,next)=>{
    err.statusCode = err.statusCode || 500

    if(process.env.NODE_ENV === 'DEVELOPMENT'){
        res.status(err.statusCode).json({
            success:false,
            error:err,
            errMessage:err.message,
            stack:err.stack
        })        
    }

    if(process.env.NODE_ENV === 'PRODUCTION'){
        let error = {...err}
        error.message = err.message

        //Wrong mongoose ObjectID error
        if(err.name === 'CastError'){
            const message = `Resource not Found. Invalid: ${err.path}`
            error = new ErrorHandler(message,400)
        }


        //Handling mongoose validation Error
        if(err.name === 'ValidationError'){
            const message = Object.values(err.errors).map(value => value.message)
            error = new ErrorHandler(message,400)
        }


        // Handling the mongoose duplicate key error (email ya registrados)

        if(err.code === 11000){
            const message = `Duplicate ${Object.keys(err.keyValue)} entered`
            error = new ErrorHandler(message,400)

        }

        // Handling wrong JWT error
        if(err.name === 'JsonWebTokenError'){
            const message = 'Token is invalid. Try again'
            error = new ErrorHandler(message,400)
        }

        // Handling expired JWT error
        if(err.name === 'TokenExpiredError'){
            const message = 'Token is expired. Try again'
            error = new ErrorHandler(message,400)
        }



        res.status(error.statusCode).json({
            success:false,
            message:error.message || 'Internal Server Error'
        })

    }

    

}