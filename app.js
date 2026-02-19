require('dotenv').config();
const express = require('express');
const { auth } = require('express-openid-connect');
const escape = require('escape-html');

const app = express();

/* highlight-start auth-config */
app.use(
  auth({
    authRequired: false, // set to true to require authentication for all routes
    auth0Logout: true,
    secret: process.env.SECRET,
    baseURL: process.env.BASE_URL,
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    issuerBaseURL: process.env.ISSUER_BASE_URL,
  })
);
/* highlight-end auth-config */

app.get('/signup', (req, res) =>
  res.oidc.login({
    returnTo: '/',
    authorizationParams: { screen_hint: 'signup' },
  })
);

app.get('/', (req, res) => {
  /* highlight-start is-authenticated */
  if (!req.oidc.isAuthenticated()) {
    return res.type('html').send(`
      <a href="/signup">Signup</a><br>
      <a href="/login">Log in</a>
    `);
  }

  res.type('html').send(`
    <p>Logged in as ${escape(req.oidc.user.name)}</p>
    <h1>User Profile</h1>
    <pre>${escape(JSON.stringify(req.oidc.user, null, 2))}</pre>
    <a href="/logout">Log out</a>
  `);
  /* highlight-end is-authenticated */
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on http://localhost:${port}`));
