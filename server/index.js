const express = require('express');
const cookieParser = require('cookie-parser');
const DataStore = require('nedb');

const app = express();
const port = 3000;
const db = new DataStore({ filename: 'database.db', autoload: true });

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
  }
  db.insert({ username, password }, (err, result) => {
    if (err) {
      res.status(500).json(err);
    }
    res.status(201).json({
      message: 'welcome to the club',
      data: result,
    });
  });
});

app.listen(process.env.port || port, () => {
  console.log(`Server start on port ${port}`);
});
