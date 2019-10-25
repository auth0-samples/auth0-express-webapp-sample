var router = require('express').Router();

router.get('/', function (req, res, next) {
  res.render('index', { title: 'Auth0 Webapp sample Nodejs' });
});

module.exports = router;
