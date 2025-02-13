// 01:05:52 Создаем middleware (функцию посредник) - checkAuth.js
import jwt from 'jsonwebtoken';

// Функция проверки авторизации
export default (req, res, next) => {
  const token = (req.headers.authorization || '').replace(/Bearer\s?/, '');

  if (token) {
    try {
      // передаем сам token и ключ к расшифровке
      const decoded = jwt.verify(token, 'secret123');
      req.userId = decoded._id;
      next();
    } catch (e) {
      return res.status(403).json({
        message: 'Нет доступа',
      });
    }
  } else {
    return res.status(403).json({
      message: 'Нет доступа',
    });
  }
};
