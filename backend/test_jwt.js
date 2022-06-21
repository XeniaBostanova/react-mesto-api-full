const jwt = require('jsonwebtoken');
const YOUR_JWT = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MmIxOTM4N2Q1ZWM3ZGQ0NDg0NzQyZjUiLCJpYXQiOjE2NTU4MDY1NTUsImV4cCI6MTY1NjQxMTM1NX0.PapVzB_eje-a-J96I3Ek4Hm6NaAh0TA4z_wCeekVTRA'; // вставьте сюда JWT, который вернул публичный сервер студента
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