const mongoose = require('mongoose'); // подключаем mongoose
const isEmail = require('validator/lib/isEmail'); // подключаем validator для валидирования электронной почты

// СХЕМА ДЛЯ USER
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Поле "email" должно быть заполнено'],
    unique: true,
    validate: {
      validator: (v) => isEmail(v),
    },
  },
  password: {
    type: String,
    required: [true, 'Поле "password" должно быть заполнено'],
    select: false,
  },
  name: {
    type: String,
    required: [true, 'Поле "name" должно быть заполнено'],
    minlength: [2, 'Минимальная длина поля "name" 2 символа'],
    maxlength: [30, 'Максимальная длина поля "name" 30 символов'],
  },
});

module.exports = mongoose.model('user', userSchema); // экспортируем модель с использование схемы
