import express from 'express';
// const express = require('express');
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import {
  registerValidation,
  loginValidation,
  postCreateValidation,
  postCreateComents,
  patchValidation,
  patchPassword,
} from './validations/validations.js'; // валидация
import checkAuth from './utils/checkAuth.js';
import * as UserController from './controllers/UserController.js'; // все методы, просто сохраняются в переменнкю UserController
import * as PostController from './controllers/PostController.js';
import handleValidationErrors from './utils/handleValidationErrors.js';
import cors from 'cors';
import * as CommentController from './controllers/CommentController.js';
import multer from 'multer';

mongoose
  .connect('mongodb+srv://channelsemen:zJnL7xZDQHRnRbnm@cluster0.vuaukjx.mongodb.net/blog')
  .then(() => console.log('DB ok'))
  .catch((err) => console.log('DB error', err));

const app = express(); // express приложение

// 1:57:00 Статические изображения
app.use('/uploads', express.static('uploads'));

// 1:50:00 хранилище для картирок. Библиотека multer
const storage = multer.diskStorage({
  destination: (_, __, cb) => {
    cb(null, 'uploads');
  },
  filename: (_, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

app.use(express.json()); // позволяет читать json, которые будут приходить к нам в запросах
app.use(cors());
// req - информация о том, что прислал клиент
// res - что буду передовать клиенту (методы, св-ва и т.д.)
app.get('/', (req, res) => {
  res.send('Hello Word!'); // вернуть клиенту сообщение Hello Word!
});

// авторизация пользователя 58:30
app.post('/auth/login', loginValidation, handleValidationErrors, UserController.login);
// проверка - если есть в '/auth/register' есть то что должно быть - registerValidation
app.post('/auth/register', registerValidation, handleValidationErrors, UserController.register);
// checkAuth - есть ли аутентификация
app.get('/auth/me', checkAuth, UserController.getMe);
// checkAuth - есть ли аутентификация
// app.get('/posts', PostController.getAll);
app.patch('/cabinet/:id', checkAuth, patchPassword, handleValidationErrors, UserController.update);

app.patch(
  '/personal/:id',
  checkAuth,
  patchValidation,
  handleValidationErrors,
  UserController.update2,
);

// загрузка картинок. Библиотека multer
app.post('/uploads', checkAuth, upload.single('image'), (req, res) => {
  res.json({
    url: `/uploads/${req.file.originalname}`,
  });
});

app.get('/posts', PostController.getAll);
app.get('/tags', PostController.getLastTags);
app.get('/posts/:id', PostController.getOne);
app.post('/posts', checkAuth, postCreateValidation, handleValidationErrors, PostController.create);
app.delete('/posts/:id', checkAuth, PostController.remove);

//! СДЕЛАТЬ ПОИСК

app.post(
  '/comment',
  checkAuth,
  // postCreateComents,
  handleValidationErrors,
  CommentController.addComment,
);

app.get(
  '/comment',
  // checkAuth,
  // postCreateComents,
  handleValidationErrors,
  CommentController.getAll,
);

app.delete('/comment/:id', checkAuth, CommentController.remove2);

// app.get('/comment/:id', CommentController.getAll);

app.patch(
  '/posts/:id',
  checkAuth,
  postCreateValidation,
  handleValidationErrors,
  PostController.update,
);

app.listen(4444, (err) => {
  // запуск сервера на порт 4444
  if (err) {
    // если есть ошибка то...
    return console.log(err); // то выведи ошибку в консоль
  }
  console.log('Server OK!'); // в противном случаи если всё получилось запустить то напиши в консоль - Server OK!
});
