// eslint-disable-next-line import/no-extraneous-dependencies
require('dotenv').config();
const { StatusCodes } = require('http-status-codes');
// eslint-disable-next-line import/no-extraneous-dependencies
const bcrypt = require('bcryptjs');
// eslint-disable-next-line import/no-extraneous-dependencies
const jwt = require('jsonwebtoken');
const userModel = require('../models/user');
const { NotFoundError, BadRequestError } = require('../utils/errors');

module.exports.getUsers = (req, res, next) => {
  userModel.find({})
    .then((users) => {
      if (!users.length) return Promise.reject(new NotFoundError('Пользователи не найдены'));
      return res.status(StatusCodes.OK).send(users);
    })
    .catch(next);
};

module.exports.getUserById = (req, res, next) => {
  userModel.findById(req.params.userId)
    .then((user) => {
      if (!user) return Promise.reject(new NotFoundError('Запрашиваемый пользователь не найден'));
      return res.status(StatusCodes.OK).send(user);
    })
    .catch(next);
};

module.exports.createUser = (req, res, next) => {
  const {
    email,
    password,
    name,
    about,
    avatar,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => userModel.create({
      email,
      password: hash,
      name,
      about,
      avatar,
    }))
    // eslint-disable-next-line
    .then(({ _id, email, name, about, avatar }) => {
      res.status(StatusCodes.CREATED).send({
        _id, email, name, about, avatar,
      });
    })
    .catch(next);
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  const { NODE_ENV, JWT_SECRET } = process.env;

  return userModel.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
        { expiresIn: '7d' },
      );
      res.cookie('jwt', token, { maxAge: 3600000, httpOnly: true }).status(StatusCodes.OK).send({ token });
    })
    .catch(next);
};

module.exports.getUserInfo = (req, res, next) => userModel.findById(req.user._id)
  .then((user) => {
    res.status(StatusCodes.OK).send(user);
  })
  .catch(next);

module.exports.updateUser = (req, res, next) => {
  const { name, about } = req.body;
  if (req.body.avatar) return Promise.reject(new BadRequestError('Чтобы изменить аватар воспользуйтесь методом PATCH на эндпоинте /users/me/avatar'));
  return userModel.findByIdAndUpdate(
    req.user._id,
    { name, about },
    {
      new: true,
      runValidators: true,
    },
  )
    .then((user) => {
      if (!user) return Promise.reject(new NotFoundError('Запрашиваемый пользователь не найден'));
      return res.status(StatusCodes.OK).send(user);
    })
    .catch(next);
};

module.exports.updateAvatar = (req, res, next) => {
  const { avatar } = req.body;
  userModel.findByIdAndUpdate(
    req.user._id,
    { avatar },
    {
      new: true,
      runValidators: true,
    },
  )
    .then((user) => {
      if (!user) return Promise.reject(new NotFoundError('Запрашиваемый пользователь не найден'));
      return res.status(StatusCodes.OK).send(user);
    })
    .catch(next);
};
