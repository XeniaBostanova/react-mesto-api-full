const jwt = require('jsonwebtoken');
const YOUR_JWT = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MmIxNDdjMmQ1ZWM3ZGQ0NDg0NzQyYTkiLCJpYXQiOjE2NTU4NzQ5NjYsImV4cCI6MTY1NjQ3OTc2Nn0.OJILiF4AeLpTUO6IX3-qJXyI38PYjn-K0bwzCl1Ogn4'; // вставьте сюда JWT, который вернул публичный сервер студента
const SECRET_KEY_DEV = 'secret-code'; // вставьте сюда секретный ключ для разработки из кода студента
try
  {const payload = jwt.verify(YOUR_JWT, SECRET_KEY_DEV);
    console.log('\x1b[31m%s\x1b[0m', `
  Надо исправить. В продакшне используется тот же    секретный ключ, что и в режиме разработки.`);
  } catch (err) {
    if (err.name === 'JsonWebTokenError' && err.message === 'invalid signature') {
      console.log('\x1b[32m%s\x1b[0m',
  'Всё в порядке. Секретные ключи отличаются');
  } else {
    console.log('\x1b[33m%s\x1b[0m','Что-то не так', err);
  }
  }