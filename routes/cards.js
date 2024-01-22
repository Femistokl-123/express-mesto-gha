const router = require('express').Router();

const {
  createCard, deleteCard, dislikeCard, getCards, likeCard,
} = require('../controllers/cards');

const { validateCardInfoAdd, validateIDfromDB } = require('../validate/validate');

router.get('/cards', getCards);

router.post('/cards', validateCardInfoAdd, createCard);

router.delete('/cards/:cardId', validateIDfromDB, deleteCard);

router.put('/cards/:cardId/likes', validateIDfromDB, likeCard);

router.delete('/cards/:cardId/likes', validateIDfromDB, dislikeCard);

module.exports = router;
