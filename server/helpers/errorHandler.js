module.exports = function (err, req, res, next) {
    console.log('ini masuk error handler');
    console.log(err);
    
    if (err.code === 400) {
        res.status(400).json({
            message: err.message
        })
    } else if (err.code === 401) {
        res.status(401).json({
            message: err.message
        })
    } else if (err.code === 404) {
        res.status(404).json({
            message: err.message
        })
    } else if (err.name === 'ValidationError') {
        const errors = {
          message: err.message,
          path: err.path
        };
        res.status(400).json(errors);
    }else if( err.name === 'MongoError'){
        res.status(400).json({
            message: "the data is Required"
        })
    } else if( err.name === 'TokenExpiredError'){
        res.status(403).json({
            message: "Token Expired"
        })
    }
    else {
        res.status(500).json({
            message: err
        })
    }
}