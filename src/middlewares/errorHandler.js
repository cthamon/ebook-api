const errorHandler = (err, req, res, next) => {
    if (err.message === "unauthorized" ||
        err.message === "e-mail or password incorrect" ||
        err.message === "invalid signature" ||
        err.message === "jwt expired") return res.status(401).json([{ message: err.message }]);
    if (err.message === "user does not exist" ||
        err.message === "user has already been followed") return res.status(400).json([{ message: err.message }]);
    return res.status(500).json([{ message: err.message }]);
};

module.exports = errorHandler;