import mongoose from 'mongoose';

// 31:40 создание схемы таблицы
const UserSchema = new mongoose.Schema(
  {
    // почта
    email: {
      type: String, // fullName будет с типом
      required: true, // при создании пользвателя считается обязательное
      unique: true, // должна быть уникальной
    },
    // информация о пароле (зашифрованная)
    passwordHash: {
      type: String, // fullName будет с типом
      required: false, // при создании пользвателя считается обязательное
    },
    fullName: {
      type: String, // fullName будет с типом
      required: false, // при создании пользвателя считается обязательное
    },
    // аватарка. Если передовать сразу тип (String), то автоматически это свойство не обязательно
    // пол
    gender: {
      type: String, // fullName будет с типом
      required: false, // при создании пользвателя считается обязательное
    },
    // деятельность
    activity: {
      type: String, // fullName будет с типом
      required: false, // при создании пользвателя считается обязательное
    },
  },
  {
    timestamps: true, // автоматически прикрепить дату создания и обновления
  },
);

// экспортировать схему, назвать её 'User', далее сама схема UserSchema
export default mongoose.model('User', UserSchema);
