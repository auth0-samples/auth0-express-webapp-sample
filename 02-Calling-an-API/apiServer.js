const dotenv = require("dotenv");
const express = require("express");
const http = require("http");
const logger = require("morgan");
const jwt = require("express-jwt");
const jwksRsa = require("jwks-rsa");

dotenv.load();
const app = express();
app.use(logger("dev"));

const checkJwt = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `${process.env.ISSUER_BASE_URL}/.well-known/jwks.json`
  }),

  audience: process.env.API_AUDIENCE,
  issuer: `${process.env.ISSUER_BASE_URL}/`,
  algorithm: ["RS256"]
});

app.get("/api/external", checkJwt, (req, res) => {
  console.log(`API server on port ${port} replies.`);
  res.send({
    msg: "Your access token was successfully validated!"
  });
});

const port = process.env.PORT || 3001;

http.createServer(app).listen(port, () => {
  console.log(`API server listening on http://localhost:${port}`);
});
