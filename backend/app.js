const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
// eslint-disable-next-line import/no-extraneous-dependencies
const { celebrate, Joi } = require('celebrate');
// eslint-disable-next-line import/no-extraneous-dependencies
const helmet = require('helmet');
// eslint-disable-next-line import/no-extraneous-dependencies
const { errors } = require('celebrate');
const { StatusCodes } = require('http-status-codes');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const auth = require('./middlewares/auth');
const cors = require('./middlewares/cors');
const regexPatterns = require('./utils/regex-patterns');

const {
  PORT = 3000,
  DB_IP = '127.0.0.1',
  DB_PORT = 27017,
  DB_NAME = 'mestodb',
} = process.env;

mongoose.connect(`mongodb://${DB_IP}:${DB_PORT}/${DB_NAME}`)
  // eslint-disable-next-line no-console
  .then(() => console.log('MongoDB connected'));

const app = express();

app.use(cors);
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(requestLogger);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.use('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().pattern(regexPatterns.email),
    password: Joi.string().required(),
  }),
}), require('./controllers/users').login);

app.use('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().pattern(regexPatterns.email),
    password: Joi.string().required(),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern(regexPatterns.url),
  }),
}), require('./controllers/users').createUser);

app.use(auth);

app.use('/users', require('./routes/users'));
app.use('/cards', require('./routes/cards'));

app.use('*', (req, res) => res.status(StatusCodes.NOT_FOUND).send({ message: 'Несуществующий эндпоинт' }));

app.use(errorLogger);
app.use(errors());
app.use(require('./middlewares/error-handler'));

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Express server started on port ${PORT}`);
});
