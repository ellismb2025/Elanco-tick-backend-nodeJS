// This function sits at the end of the app and catches any errors
const ErrorHandler = (err, req, res, next) => {
    console.error("Error captured:", err); // Log for the developer

    // Handle Database Validation Errors
    if (err.name === 'SequelizeValidationError') {
        return res.status(400).json({
            success: false,
            error: 'Data Validation Error',
            details: err.errors.map(e => e.message) // List exactly what was wrong
        });
    }

    // Handle Duplicate ID Errors
    if (err.name === 'SequelizeUniqueConstraintError') {
        return res.status(409).json({
            success: false,
            error: 'Duplicate Entry: This ID already exists.'
        });
    }

    // Handle General Server Errors
    res.status(500).json({
        success: false,
        error: 'Internal Server Error'
    });
};

module.exports = ErrorHandler;