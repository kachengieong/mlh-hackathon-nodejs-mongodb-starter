const express = require('express');

const router = express.Router();

router.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/');
});

router.get('/login', (req, res) => {
  res.render('login/index');
});

router.get('/signup', (req, res) => {
  res.render('signup/index');
});

module.exports = router;
