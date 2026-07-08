const asyncHandler = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch((error) => {
        res.json({ message: "An error occurred", error: error.message });
    });
};

export default asyncHandler;