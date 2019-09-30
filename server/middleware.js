const jwt = require('jsonwebtoken');

const secret = 'supersecret';
const withAuth = (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    res.status(401).send('Unauthorized: No token provided');
  } else {
    jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        res.status(401).send('Unauthorized: Invalid token');
      } else {
        req.data = decoded;
        next();
      }
    });
  }
};
module.exports = withAuth;
