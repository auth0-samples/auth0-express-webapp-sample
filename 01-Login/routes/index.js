var router = require('express').Router();
const { requiresAuth } = require('@auth0/auth0-express');

router.get('/', async function (req, res, next) {
  const user = await req.auth0.client.getUser();
  res.render('index', {
    title: 'Auth0 Webapp sample Nodejs',
    isAuthenticated: !!user
  });
});

router.get('/profile', requiresAuth(), async function (req, res, next) {
  const user = await req.auth0.client.getUser();
  res.render('profile', {
    userProfile: JSON.stringify(user, null, 2),
    title: 'Profile page'
  });
});

module.exports = router;
