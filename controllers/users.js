const User = require('../models/user');

const {
  ERR_BAD_REQUEST_CODE,
  ERR_DEFAULT_CODE,
  ERR_NOT_FOUND_CODE,
} = require('../errors/errors');

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => {
      res.status(200).send(users);
    })
    .catch(() => {
      res.status(ERR_DEFAULT_CODE).send({ message: 'Ошибка сервера' });
    });
};

module.exports.getUserById = (req, res) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (!user) {
        res
          .status(ERR_NOT_FOUND_CODE)
          .send({ message: 'Запрашиваемый пользователь не найден.' });
        return;
      }
      res.status(200).send(user);
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

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => {
      res.status(201).send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(ERR_BAD_REQUEST_CODE).send({
          message: 'Данные введены некорректно',
        });
      }
      return res.status(ERR_DEFAULT_CODE).send({ message: 'Что-то пошло не так' });
    });
};

module.exports.updateUser = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    {
      new: true,
      runValidators: true,
    },
  )
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(ERR_BAD_REQUEST_CODE).send({
          message: 'Данные введены некорректно',
        });
      }
      return res.status(ERR_DEFAULT_CODE).send({ message: 'Что-то пошло не так' });
    });
};

module.exports.updateAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    {
      new: true,
      runValidators: true,
    },
  )
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(ERR_BAD_REQUEST_CODE).send({
          message: 'Данные введены некорректно',
        });
      }
      return res.status(ERR_DEFAULT_CODE).send({ message: 'Что-то пошло не так' });
    });
};