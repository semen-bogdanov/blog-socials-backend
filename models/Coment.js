import mongoose from 'mongoose';

// comment: comment,
// post: post,
// user: user,
// name: name,
// avatarUrl: avatarUrl,

const commentSchema = new mongoose.Schema(
  {
    // Коментарии
    comment: {
      type: String,
      required: false,
    },
    // id поста
    post: {
      type: String,
      required: false,
    },
    // автор статьи
    user: {
      type: String,
      required: false,
    },
    // Имя и Фамилия автора
    name: {
      type: String,
      required: false,
    },
    // Адрес аватарки
    avatarUrl: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true, // автоматически прикрепить дату создания и обновления
  },
);

// экспортировать схему, назвать её 'Post', далее сама схема PostSchema
export default mongoose.model('comment', commentSchema);
