import { body } from 'express-validator';

// 37 минута
// 43:40 продолжение исправления кода. Новая версия
export const loginValidation = [
  body('email', 'Не верный формат почты').isEmail(), // если в теле запроса (body)  email, является ли email
  body('password', 'Пароль должен быть минимум 5 символов').isLength({ min: 5 }), // если длина минимум 5 символов то ОК
];

export const registerValidation = [
  body('email', 'Не верный формат почты').isEmail(), // если в теле запроса (body)  email, является ли email
  body('password', 'Пароль должен быть минимум 6 символов').isLength({ min: 6 }), // если длина минимум 5 символов то ОК
  body('gender', 'Выбирете пол').optional().isString(),
  body('activity', 'Выбирете деятельность').optional().isString(),
  body('fullName', 'Укажите имя').isLength({ min: 3 }), // имя может быть минимум 3 символа
  // body('avatarUrl', 'Не вверная ссылка (URL) на аватарку').optional().isURL(), // является ли это ссылкой или нет
];

export const patchValidation = [
  body('email', 'Не верный формат почты').isEmail(), // если в теле запроса (body)  email, является ли email
  body('gender', 'Выбирете пол').optional().isString(),
  body('activity', 'Выбирете деятельность').optional().isString(),
  body('fullName', 'Укажите имя').isLength({ min: 3 }), // имя может быть минимум 3 символа
];

export const patchPassword = [
  body('password', 'Пароль должен быть минимум 6 символов').isLength({ min: 6 }), // если длина минимум 5 символов то ОК
];

// 1:22:00
export const postCreateValidation = [
  body('title', 'Введите заголовок статьи').isLength({ min: 3 }).isString(),
  body('text', 'Введите текст статьи').isLength({ min: 3 }).isString(),
  body('tags', 'Неверный формат тэгов (укажите массив)').optional().isString(),
  body('imageUrl', 'Неверная ссылка на изображение').optional().isString(),
  // body('likes', 'Неверный формат').optional().isLength({ min: 1 }),
  // body('categories', 'Неверное название').optional().isString(),
];

// categories
export const postCreateComents = [
  body('comment', 'Введите текст комментария').isLength({ min: 3 }).isString(),
  body('id_post', 'Дата').isLength({ min: 3 }).isString(),
];

// isEmail(): Проверяет, является ли значение электронной почтой.
// isLength({ min, max }): Проверяет длину значения в пределах заданного диапазона.
// isIn(values): Проверяет, содержится ли значение в указанных значениях.
// custom(): Позволяет определить собственную функцию проверки.
