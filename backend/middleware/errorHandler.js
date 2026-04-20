module.exports = (err, req, res, next) => {
    console.error(err.stack);
    const status = res.statusCode !== 200 ? res.statusCode : 500;
    res.status(status).json({
        success: false,
        error: err.message || 'Error interno del servidor'
    });
};
