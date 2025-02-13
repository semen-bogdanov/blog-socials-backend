// создание статей
import PostModel from '../models/Post.js';

// 2:33:00 дописывание функционала про тегов
export const getLastTags = async (req, res) => {
  try {
    const posts = await PostModel.find().limit(8).exec();

    const tags = posts
      .map((obj) => obj.tags)
      .flat()
      .slice(0, 8);

    res.json(tags);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Не удалось получить статьи',
    });
  }
};

// получение всех статей
export const getAll = async (req, res) => {
  try {
    // 1:37:00
    const posts = await PostModel.find().populate('user').exec();
    res.json(posts);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Не удалось получить статьи',
    });
  }
};

// получение одну статью 1:38:00
export const getOne = async (req, res) => {
  try {
    const postId = req.params.id;

    // findOneAndUpdate - получать статью и её обновлять. Т.е. как только статью пользователь получит должно быть увеличено кол-во просмотров
    const post = await PostModel.findOneAndUpdate(
      {
        _id: postId,
      },
      {
        $inc: { viewsCount: 1 }, // то что обновляем. Увеличивается кол-во просмотров
      },
      {
        returnDocument: 'after', // обновлённый результат вернуть
        new: true, // Эта опция «новая» предназначена для Mongoose до версии 6.0. Для Mongoose 6.0+ используйте returnDocument.
      },
    ).populate('user');
    if (!post) {
      return res.status(404).json({
        message: 'Статья не найдена',
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

// создание статьи
export const create = async (req, res) => {
  try {
    const doc = new PostModel({
      title: req.body.title,
      text: req.body.text,
      imageUrl: req.body.imageUrl,
      tags: req.body.tags.split(','),
      categories: req.body.categories,
      user: req.userId,
      clicklikes: req.body.clicklikes,
      dizlikes: req.body.dizlikes,
    });

    const post = await doc.save();

    res.json(post);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Не удалось создать статью',
    });
  }
};

// обновление статьи 1:47:00
export const update = async (req, res) => {
  try {
    const postId = req.params.id;
    const doc = await PostModel.updateOne(
      {
        _id: postId,
      },
      {
        title: req.body.title,
        text: req.body.text,
        imageUrl: req.body.imageUrl,
        tags: req.body.tags.split(','),
        viewsCount: req.body.viewsCount,
        user: req.userId,
        categories: req.body.categories,
        likes: req.body.likes,
        clicklikes: req.body.clicklikes,
        dizlikes: req.body.dizlikes,
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
      message: 'Не удалось обновить статью',
    });
  }
};

// удаление статьи 1:42:40
export const remove = async (req, res) => {
  try {
    const postId = req.params.id;
    const doc = await PostModel.findOneAndDelete({ _id: postId });

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
      message: 'Не удалось получить статью',
    });
  }
};
