const Card = require('../models/card');

const {
  ERR_BAD_REQUEST_CODE,
  ERR_DEFAULT_CODE,
  ERR_NOT_FOUND_CODE,
} = require('../errors/errors');

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((cards) => {
      res.status(200).send(cards);
    })
    .catch(() => {
      res.status(ERR_DEFAULT_CODE).send({ message: 'Что-то пошло не так' });
    });
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  Card.create({ name, link, owner })
    .then((card) => res.status(201).send({
      name: card.name,
      link: card.link,
      owner: card.owner,
      _id: card._id,
    }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(ERR_BAD_REQUEST_CODE).send({
          message: 'Данные введены некорректно',
        });
      }
      return res.status(ERR_DEFAULT_CODE).send({ message: 'Что-то пошло не так' });
    });
};

module.exports.deleteCard = (req, res) => {
  Card.findByIdAndDelete(req.params.cardId)
    .then((card) => {
      if (!card) {
        res.status(ERR_NOT_FOUND_CODE).send({ message: 'Карточка не найдена' });
        return;
      }
      res.status(200).send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(ERR_BAD_REQUEST_CODE).send({
          message: 'Данные введены некорректно',
        });
      }
      return res.status(ERR_DEFAULT_CODE).send({ message: 'Что-то пошло не так' });
    });
};

module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        res.status(ERR_NOT_FOUND_CODE).send({ message: 'Карточка не найдена' });
        return;
      }
      res.status(200).send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(ERR_BAD_REQUEST_CODE).send({
          message: 'Данные введены некорректно',
        });
      }
      return res.status(ERR_DEFAULT_CODE).send({ message: 'Что-то пошло не так' });
    });
};

module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        res.status(ERR_NOT_FOUND_CODE).send({ message: 'Карточка не найдена' });
        return;
      }
      res.status(200).send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(ERR_BAD_REQUEST_CODE).send({
          message: 'Данные введены некорректно',
        });
      }
      return res.status(ERR_DEFAULT_CODE).send({ message: 'Что-то пошло не так' });
    });
};
