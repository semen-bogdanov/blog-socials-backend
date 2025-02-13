// 1:17:00 - controller
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { validationResult } from 'express-validator';
import UserModel from '../models/User.js';

export const register = async (req, res) => {
  try {
    // сначало проверка на ошибки 41 минута

    // вытаскиваем пароль перед началом отправки 46:30
    const password = req.body.password;
    // далее нужно сгенерировать salt (алгоритм шифрования пароля) через bcrypt
    const salt = await bcrypt.genSalt(10);
    // шифруем - 1. password 2. salt
    const hash = await bcrypt.hash(password, salt);
    // passwordHash - зашифрованный пароль

    // 45 минута. После вышеуказанной проверки нужно создать пользователя в базе данных Mongo DB
    const doc = new UserModel({
      email: req.body.email,
      passwordHash: hash,
      fullName: req.body.fullName,
      gender: req.body.gender,
      activity: req.body.activity,
    });
    // 48:10. Сохраняем doc в базу данных
    const user = await doc.save();
    // 54:30
    const token = jwt.sign(
      {
        _id: user._id,
      },
      'secret123', // ключ для зашифрования токена
      {
        expiresIn: '30d', // сколько времнеи будет жить токен (30 дней)
      },
    );

    // 57:30. Удаляем passwordHash из запроса (чтобы не было видно его)
    const { passwordHash, ...userData } = user._doc;

    // если ошибок нет то вернется сообщение success: true
    // 56 минута
    res.json({
      ...userData,
      token,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Не удалось зарегистрироваться',
    });
  }
};

export const login = async (req, res) => {
  try {
    // Ищем пользователя в базе данных. Нази в базе данных email
    const user = await UserModel.findOne({ email: req.body.email });

    if (!user) {
      // если в базе данных нету user (указанного email) то выдать код 404
      return res.status(404).json({
        message: 'Пользователь не найден',
      });
    }
    // проверяем пароль. Сходится ли с тем, что прислал пользователь 1:01:00
    const isValidPass = await bcrypt.compare(req.body.password, user._doc.passwordHash);
    // если парли не сходятся то...
    if (!isValidPass) {
      return res.status(400).json({
        message: 'Не верный логин или пароль',
      });
    }
    const token = jwt.sign(
      {
        _id: user._id,
      },
      'secret123', // ключ для зашифрования токена
      {
        expiresIn: '30d', // сколько времнеи будет жить токен (30 дней)
      },
    );

    const { passwordHash, ...userData } = user._doc;
    res.json({
      ...userData,
      token,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Не верный логин или пароль',
    });
  }
};

export const getMe = async (req, res) => {
  try {
    // UserModel должен с помощью findById вытащить userId и найти в базе данных такую запись по такому id
    const user = await UserModel.findById(req.userId); // 1:14:00

    // если такого пользователя нету, то скажи об этом 404
    if (!user) {
      return res.status(404).json({
        message: 'Пользователь не найден',
      });
    }
    // если пользователь нашёлся то вернуть его мне
    const { passwordHash, ...userData } = user._doc;

    res.json(userData);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Нет доступа',
    });
  }
};

export const update = async (req, res) => {
  try {
    const postId = req.params.id;
    // вытаскиваем пароль перед началом отправки 46:30
    const password = req.body.password;
    // далее нужно сгенерировать salt (алгоритм шифрования пароля) через bcrypt
    const salt = await bcrypt.genSalt(10);
    // шифруем - 1. password 2. salt
    const hash = await bcrypt.hash(password, salt);
    // passwordHash - зашифрованный пароль
    const doc = await UserModel.updateOne(
      {
        _id: postId,
      },
      {
        passwordHash: hash,
      },
    );

    if (!doc) {
      return res.status(404).json({
        message: 'Статья не найдена',
      });
    }

    res.json({
      success: true,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Не удалось обновить данные',
    });
  }
};

export const update2 = async (req, res) => {
  try {
    const postId = req.params.id;
    const doc = await UserModel.updateOne(
      {
        _id: postId,
      },
      {
        email: req.body.email,
        fullName: req.body.fullName,
        gender: req.body.gender,
        activity: req.body.activity,
      },
    );

    if (!doc) {
      return res.status(404).json({
        message: 'Статья не найдена',
      });
    }

    res.json({
      success: true,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Не удалось обновить данные',
    });
  }
};
