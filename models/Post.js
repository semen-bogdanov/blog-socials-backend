import mongoose from 'mongoose';

//! Коментарии в сайт сделать
// Посмотреть аналоги как это делаеться на back end
// Реализовать вариант.
// Сделать фронтенд. Написание сообщения и вывод на front

// 31:40 создание схемы таблицы
const PostSchema = new mongoose.Schema(
  {
    title: {
      type: String, // title будет с типом
      required: true, // при создании пользвателя считается обязательное
    },
    // текст статьи
    text: {
      type: String, // text будет с типом
      required: true, // при создании пользвателя считается обязательное
      unique: true, // должна быть уникальной
    },
    tags: {
      type: Array,
      default: [],
    },
    // просмотры статьи
    viewsCount: {
      type: Number,
      default: 0,
    },
    likes: {
      type: Number,
      default: 0,
    },
    clicklikes: {
      type: Boolean,
      default: false,
    },
    dizlikes: {
      type: Boolean,
      default: false,
    },
    categories: {
      type: String, // categories будет с типом
      required: false, // при создании пользвателя считается обязательное
    },
    // автор статьи
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true, // при создании считается обязательное
    },
    imageUrl: String,
  },
  {
    timestamps: true, // автоматически прикрепить дату создания и обновления
  },
);

// экспортировать схему, назвать её 'Post', далее сама схема PostSchema
export default mongoose.model('Post', PostSchema);
