const errorHandler = (err, req, res, next) => {
    if (err) {
        const { code = 500, message = "Unexpected Error" } = err;
        res.status(code).json({ message });
    } else {
        next();
    }
};

module.exports = errorHandler;
