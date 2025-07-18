// services/userService.js

const users = [
  {
    id: 1,
    username: 'admin',
    password: 'admin123' // en producción se usaría encriptado con bcrypt
  }
];

function findUser(username, password) {
  return users.find(user => user.username === username && user.password === password);
}

module.exports = { findUser };