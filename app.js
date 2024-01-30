const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const cors = require('cors');

require('dotenv').config();

const { login, createUser } = require('./controllers/users');
const { validateUser, validateUserForLogin } = require('./validate/validate');
const auth = require('./middlewares/auth');
const NotFoundErr = require('./errors/NotFoundErr');
const errorMiddleware = require('./middlewares/error');
const { requestLogger, errorLogger } = require('./middlewares/logger');

mongoose.connect('mongodb://127.0.0.1/mestodb');

const app = express();

const corsOptions = {
  origin: '*',
};

app.use(cors(corsOptions));

const { PORT = 3000 } = process.env;

app.use(requestLogger);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.post('/signin', validateUserForLogin, login);
app.post('/signup', validateUser, createUser);

app.use(auth);

app.use('/', require('./routes/users'));
app.use('/', require('./routes/cards'));

app.use(() => {
  throw new NotFoundErr('Страница не найдена');
});

app.use(errorLogger);
app.use(errors());
app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log(`Server starts on ${PORT}`);
});
