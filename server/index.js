const express = require('express');
const cookieParser = require('cookie-parser');
const DataStore = require('nedb');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const { check, validationResult } = require('express-validator');
const withAuth = require('./middleware');

const app = express();
const port = 3001;
const db = new DataStore({ filename: 'database.db', autoload: true });
const key = 'supersecret';

const validator = [
  check('username')
    .exists()
    .withMessage('No username provided'),
  check('username')
    .not()
    .isEmpty()
    .withMessage('Username should not be empty'),
  check('password')
    .exists()
    .withMessage('No password provided'),
  check('password')
    .isLength({ min: 8 })
    .withMessage('Password should be at least 8 chars long'),
];

app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
app.use(express.json());
app.use(cookieParser());

app.get('/api/v1/', (req, res) => {
  res.status(200).json({
    message: 'hello world',
  });
});

app.post('/api/v1/register', validator, (req, res) => {
  const { username, password } = req.body;
  const errorFormatter = ({ message, param }) => ({ message, param });
  const errors = validationResult(req).formatWith(errorFormatter);

  if (!errors.isEmpty()) {
    res.status(400).json(errors.array({ onlyFirstError: true }));
  } else {
    db.findOne({ username }, (err, doc) => {
      if (err) {
        res.status(500).json({
          message: err,
        });
      } else if (doc) {
        res
          .status(400)
          .json({ message: 'Username already exists', param: 'username' });
      } else {
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
                  data: document.username,
                });
              }
            });
          }
        });
      }
    });
  }
});

app.post('/api/v1/login', (req, res) => {
  const { username, password } = req.body;
  db.findOne({ username }, (err, document) => {
    if (err) {
      res.sendStatus(500);
    } else if (document === null) {
      res.status(404).json({
        message: 'User not found',
      });
    } else {
      bcrypt.compare(password, document.password, (error, same) => {
        if (error) {
          res.sendStatus(500);
        }
        if (same) {
          const token = jwt.sign({ id: document._id }, key, {
            expiresIn: '1m',
          });
          res.cookie('token', token, {
            httpOnly: true,
            sameSite: 'none',
            secure: false,
          });
          res.status(200).json({
            message: 'Login success',
          });
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
  const { id } = req.data;
  db.findOne({ _id: id }, (err, document) => {
    if (err) {
      res.status(500).json(err);
    } else {
      res.status(200).json({
        data: document.username,
      });
    }
  });
});

app.listen(process.env.port || port, () => {
  console.log(`Server start on port ${port}`);
});
