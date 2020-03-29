var router = require('express').Router();
const { requiresAuth } = require('express-openid-connect');
var bodyParser = require('body-parser');
var csrf = require('csurf');

// Session key must match the session name of expressoidc
var csrfProtection = csrf({ sessionKey: 'identity' });
var parseForm = bodyParser.urlencoded({ extended: false });

router.get('/', csrfProtection, function (req, res, next) {
  res.render('index', { 
    title: 'Auth0 Webapp sample Nodejs',
    isAuthenticated: req.isAuthenticated(),
    csrfToken: req.csrfToken()
  });
});

router.get('/profile', requiresAuth(), function (req, res, next) {
  res.render('profile', {
    userProfile: JSON.stringify(req.openid.user, null, 2),
    title: 'Profile page'
  });
});

router.post('/process', requiresAuth(), parseForm, csrfProtection, function (req, res) {
  res.send('data is being processed');
});

module.exports = router;
