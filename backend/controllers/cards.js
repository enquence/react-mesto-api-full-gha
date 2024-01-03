const { StatusCodes } = require('http-status-codes');
const cardModel = require('../models/card');
const { ForbiddenError, NotFoundError } = require('../utils/errors');

module.exports.getCards = (req, res, next) => {
  cardModel.find({})
    .then((cards) => res.status(StatusCodes.OK).send(cards))
    .catch(next);
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  cardModel.create({ name, link, owner })
    .then((card) => res.status(StatusCodes.CREATED).send(card))
    .catch(next);
};

module.exports.deleteCard = (req, res, next) => {
  cardModel.findById(req.params.cardId)
    .then((card) => {
      if (!card) return Promise.reject(new NotFoundError('Запрашиваемая карточка не найдена'));
      if (!card?.owner.equals(req.user._id)) return Promise.reject(new ForbiddenError('Невозможно удалить чужую карточку'));
      return cardModel.findByIdAndDelete(req.params.cardId);
    })
    .then(() => res.status(StatusCodes.OK).send({ message: 'Карточка успешно удалена' }))
    .catch(next);
};

module.exports.likeCard = (req, res, next) => {
  cardModel.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) return Promise.reject(new NotFoundError('Запрашиваемая карточка не найдена'));
      return res.status(StatusCodes.OK).send(card);
    })
    .catch(next);
};

module.exports.dislikeCard = (req, res, next) => {
  cardModel.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) return Promise.reject(new NotFoundError('Запрашиваемая карточка не найдена'));
      return res.status(StatusCodes.OK).send(card);
    })
    .catch(next);
};
