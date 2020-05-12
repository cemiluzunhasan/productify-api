
const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const authMiddleWare = require('../middlewares/auth');

router.post('/login', (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  User.findOne({ email }).then(user => {
    const isPasswordCorrect = bcrypt.compareSync(password, user.password);

    if (isPasswordCorrect) {
      const token = jwt.sign({ _id: user._id }, 'cemiluzunhasan');
      res.header('Auth-Token', token);
      res.status(200).send({ userId: user._id, accessToken: token });
    }
  }).catch(e => {
    res.status(400).send(e);
  });
});

router.post('/register', (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  const salt = bcrypt.genSaltSync(10);

  const hashedPassword = bcrypt.hashSync(password, salt).toString();
  const user = new User({ email, password: hashedPassword });

  user.save().then(data => {
    res.status(201).send(data);
  }).catch(err => {
    res.status(400).send(err);
  });
});

//TODO: Password will be deleted
router.get('/me', authMiddleWare, (req, res) => {
  User.findOne({ _id: req.userId }).then(user => {
    res.status(200).send(user);
  }).catch(() => {
    res.status(400).send({ message: 'There is no user' });
  })
});

module.exports = router;
