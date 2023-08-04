const dotenv = require('dotenv');
const express = require('express');
const { auth } = require('express-openid-connect');

const MemoryStore = require('memorystore')(auth);

dotenv.config();

const appA = express();
const appB = express();

const config = {
  authRequired: false,
  auth0Logout: true
};

appA.use(
  auth({
    baseURL: `http://localhost:${process.env.APP_A_PORT}`,
    clientID: process.env.APP_A_CLIENT_ID,
    secret: process.env.APP_A_SECRET,
    session: { name: 'appSessionA' },
    backchannelLogout: {
      store: new MemoryStore()
    },
    ...config
  })
);
appB.use(
  auth({
    baseURL: `http://localhost:${process.env.APP_B_PORT}`,
    clientID: process.env.APP_B_CLIENT_ID,
    secret: process.env.APP_B_SECRET,
    session: { name: 'appSessionB' },
    backchannelLogout: {
      store: new MemoryStore()
    },
    ...config
  })
);

const home = (app) => (req, res) => {
  if (req.oidc.user) {
    res.send(`
      <h1>App ${app}</h1>
      <h1>You are logged in as ${req.oidc.user.name} <a href="/logout"><button>Logout</button></a></h1>
      <h2><button onclick="location.reload()">Reload</button></a></h2>
    `);
  } else {
    res.send(`
      <h1>App ${app}</h1>
      <h1>You are logged out <a href="/login"><button>Login</button></a></h1>
      <h2><button onclick="location.reload()">Reload</button></a></h2>
    `);
  }
};

appA.get('/', home('A'));
appB.get('/', home('B'));

appA.listen(process.env.APP_A_PORT, () => console.log(`App A: http://localhost:${process.env.APP_A_PORT}`));
appB.listen(process.env.APP_B_PORT, () => console.log(`App A: http://localhost:${process.env.APP_B_PORT}`));
