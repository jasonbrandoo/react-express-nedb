const express = require('express');
const cookieParser = require('cookie-parser');
const DataStore = require('nedb');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const { check, validationResult } = require('express-validator');
const withAuth = require('./middleware');

const app = express();
const port = 3001;
const db = new DataStore({ filename: 'database.db', autoload: true });
const key = 'supersecret';

app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
app.use(express.json());
app.use(cookieParser());

app.get('/api/v1/', (req, res) => {
  res.status(200).json({
    message: 'hello world',
  });
});

app.post('/api/v1/register', [
  check('username').exists().withMessage('No username provided'),
  check('username').not().isEmpty().withMessage('Username should not be empty'),
  check('password').exists().withMessage('No password provided'),
  check('password').isLength({ min: 8 }).withMessage('Password should be at least 8 chars long')
], (req, res) => {
  // Just show the parameter name and the error message.
  const errorFormatter = ({ msg, param }) => ({ msg, param });
  const errors = validationResult(req).formatWith(errorFormatter);
  if (!errors.isEmpty()) {
    return res.status(400).json(errors.array({ onlyFirstError: true }));
  } else {
    const { username, password } = req.body;
    // Check if username already exists.
    db.findOne({ username }, (err, doc) => {
      if (doc) {
        return res.status(400).json({ msg: 'Username already exists', param: 'username' });
      }

      bcrypt.hash(password, 10, (error, encrypted) => {
        if (error) {
          res.sendStatus(500);
        } else {
          db.insert({ username, password: encrypted }, (err, document) => {
            if (err) {
              res.sendStatus(500);
            } else {
              res.status(201).json({
                message: 'welcome to the club',
                data: document,
              });
            }
          });
        }
      });
    });
  }
});

app.post('/api/v1/login', (req, res) => {
  const { username, password } = req.body;
  db.findOne({ username }, (err, document) => {
    if (err) {
      res.sendStatus(500);
    } else if (document === null) {
      res.sendStatus(500);
    } else {
      bcrypt.compare(password, document.password, (error, same) => {
        if (error) {
          res.sendStatus(500);
        }
        if (same) {
          const token = jwt.sign({ username }, key, {
            expiresIn: '1m',
          });
          res.cookie('token', token, { httpOnly: true }).sendStatus(200);
        }
      });
    }
  });
});

app.get('/api/v1/logout', (req, res) => {
  res.clearCookie('token');
  res.sendStatus(200);
});

app.get('/api/v1/check', withAuth, (req, res) => {
  res.sendStatus(200);
});

app.listen(process.env.port || port, () => {
  console.log(`Server start on port ${port}`);
});
