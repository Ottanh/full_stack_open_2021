const logger = require('./logger');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const errorHandler = (error, request, response, next) => {
  logger.error(error.message);

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' });
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message });
  } else if (error.name === 'JsonWebTokenError') {
    return response.status(401).json({
      error: 'invalid token',
    });
  }

  next(error);
};

/*
const tokenExtractor = (request, response, next) => {
  // tokenin ekstraktoiva koodi
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    request.token = authorization.substring(7)
  }

  next()
}*/

const userExtractor = async (request, response, next) => {
  // userin ekstraktoiva koodi
  const authorization = request.get('authorization');
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    request.token = authorization.substring(7);
  }

  const decodedToken = jwt.verify(request.token, process.env.SECRET);
  const user = await User.findById(decodedToken.id);
  request.user = user;

  next();
};

module.exports = {
  errorHandler,
  userExtractor,
};