var router = require('express').Router();
const { requiresAuth } = require('express-openid-connect');

router.get('/', function (req, res, next) {
  res.render('index', { 
    title: 'Auth0 Webapp sample Nodejs',
    isAuthenticated: req.isAuthenticated() 
  });
});

router.get('/profile', requiresAuth(), function (req, res, next) {
  res.render('profile', {
    userProfile: JSON.stringify(req.openid.user, null, 2),
    title: 'Profile page'
  });
});

module.exports = router;
