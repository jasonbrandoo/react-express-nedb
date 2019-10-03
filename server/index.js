const express = require('express');
const cookieParser = require('cookie-parser');
const DataStore = require('nedb');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');
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

app.post('/api/v1/register', (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    res.status(500).json({
      message: 'please input valid username and password',
    });
  } else {
    bcrypt.hash(password, 10, (error, encrypted) => {
      if (error) {
        res.status(500).json(error);
      } else {
        db.insert({ username, password: encrypted }, (err, document) => {
          if (err) {
            res.status(500).json(err);
          } else {
            res.status(201).json({
              message: 'welcome to the club',
              data: document,
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
