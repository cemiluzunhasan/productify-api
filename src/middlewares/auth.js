const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const token = req.header('auth-token');

  jwt.verify(token, 'cemiluzunhasan', (err, decodedToken) => {
    if (err) {
      res.status(401).send({ message: 'Unauthorized' });
    }
    req.userId = decodedToken._id;
    next();
  });
}