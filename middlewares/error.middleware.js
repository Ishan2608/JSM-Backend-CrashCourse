const errorMiddleware = (err, req, res, next) =>{
    try{
        let e = {...err};
        e.message = err.message;
        console.error(`Try Block of errorMiddleware:\n${e.message}`);

        // Mongoose bad ObjectId
        if (err.name === "CastError") { 
            const msg = 'Resource not Found';
            e = new Error(msg);
            e.statusCode = 404;
        }
        if (err.code === 11000){
            const msg = 'Duplicate field entered';
            e = new Error(msg);
            e.statusCode = 400;
        }
        if (err.name === 'ValidationError'){
            const msg = Object.values(err.errors).map(val => val.message);
            e = new Error(msg.join(', '))
            e.statusCode = 400;
        }

        res.status(e.statusCode || 500).json({status: false, message: e.message || "Server Error"});
    }
    catch(error){
        console.error(`Catch Block of errorMiddleware:\n${error}`)
    }
}

export default errorMiddleware;