function requestLogger(request, response, next) {
    console.log('Method:', request.method);
    console.log('Path:  ', request.path);
    console.log('Body:  ', request.body);
    console.log('---');
    next();
}

function unknownEndpoint(request, response) {
    response.status(404).send({ error: 'unknown endpoint' });
}

function errorHandler(error, request, response, next) {
    console.error(error.message);

    if (error) {
        return response.status(400).json({ error: error });
    }

    next(error);
}

module.exports = {
    requestLogger,
    unknownEndpoint,
    errorHandler
}