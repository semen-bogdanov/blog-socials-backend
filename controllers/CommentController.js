import Comment from '../models/Coment.js';

// export const addComment = async (req, res) => {
//   try {
//     const doc = new Comment({
//       comment: req.body.comment,
//       post: req.body.post,
//       user: req.userId,
//       name: req.body.name,
//     });
//     const post = await doc.save();
//     res.json(post);
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({
//       message: 'Не удалось создать коментарий',
//     });
//   }
// };

export const addComment = async (req, res) => {
  try {
    const { comment, post, user, name, avatarUrl } = req.body; // Добавлено деструктурирование для получения значений из req.body

    const doc = new Comment({
      comment: comment,
      post: post,
      user: user,
      name: name,
      avatarUrl: avatarUrl,
    });

    const savedComment = await doc.save();
    res.json(savedComment);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Не удалось создать комментарий',
    });
  }
};

// получение всех коментариев
export const getAll = async (req, res) => {
  try {
    const posts = await Comment.find().populate('comment').exec();
    res.json(posts);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Не удалось получить коментарии',
    });
  }
};

// получить все коментарии поста
export const getAllPosts = async (req, res) => {
  try {
    const postId = req.params.id;
    // findOneAndUpdate - получать статью и её обновлять. Т.е. как только статью пользователь получит должно быть увеличено кол-во просмотров
    const post = await Comment.find(
      {
        post: postId,
      },
      {
        returnDocument: 'after', // обновлённый результат вернуть
        new: true, // Эта опция «новая» предназначена для Mongoose до версии 6.0. Для Mongoose 6.0+ используйте returnDocument.
      },
    ).populate('comment');
    if (!post) {
      return res.status(404).json({
        message: 'Коментарий не найдена',
      });
    }
    res.json(post);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Не удалось получить статьи',
    });
  }
};

// удаление коментария
export const remove2 = async (req, res) => {
  try {
    const postId = req.params.id;
    const doc = await Comment.findOneAndDelete({ post: postId });

    if (!doc) {
      return res.status(404).json({
        message: 'Комментарий не найден!',
      });
    }

    res.json({
      success: true,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Не удалось получить коментарий',
    });
  }
};
