const jwt = require('jsonwebtoken');

const jwtSecret = 'S1s2s3s4@12';

module.exports.verifyToken = function (req, res, next) {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ error: 'Token not provided.' });
  }

  jwt.verify(token.split(' ')[1], jwtSecret, (err, decoded) => {
    if (err) {
      return res.status(403).json({ error: 'Failed to authenticate token.' });
    }

    req.user = decoded; // Attach the decoded user information to the request object
    next();
  });
};
