const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const { login, createUser } = require('./controllers/users');
const { validateUser } = require('./validate/validate');
const auth = require('./middlewares/auth');
const NotFoundErr = require('./errors/NotFoundErr');
const errorMiddleware = require('./middlewares/error');

mongoose.connect('mongodb://localhost:27017/mestodb');

const app = express();
const { PORT = 3000 } = process.env;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/signin', validateUser, login);
app.post('/signup', validateUser, createUser);

app.use(auth);

app.use('/', require('./routes/users'));
app.use('/', require('./routes/cards'));

app.use(() => {
  throw new NotFoundErr('Страница не найдена');
});

app.use(errors());
app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log(`Server starts on ${PORT}`);
});
