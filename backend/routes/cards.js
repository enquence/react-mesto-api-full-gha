const router = require('express').Router();
// eslint-disable-next-line import/no-extraneous-dependencies
const { celebrate, Joi } = require('celebrate');
const {
  getCards, createCard, deleteCard, likeCard, dislikeCard,
} = require('../controllers/cards');
const regexPatterns = require('../utils/regex-patterns');

const cardIdCelebrateSchema = {
  params: Joi.object().keys({
    cardId: Joi.string().required().hex().length(24),
  }),
};

router.get('/', getCards);
router.post('/', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().pattern(regexPatterns.url),
  }),
}), createCard);
router.delete('/:cardId', celebrate(cardIdCelebrateSchema), deleteCard);
router.put('/:cardId/likes', celebrate(cardIdCelebrateSchema), likeCard);
router.delete('/:cardId/likes', celebrate(cardIdCelebrateSchema), dislikeCard);

module.exports = router;
