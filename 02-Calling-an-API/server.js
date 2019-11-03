const dotenv = require("dotenv");
const express = require("express");
const http = require("http");
const logger = require("morgan");
const path = require("path");
const session = require("cookie-session");
const router = require("./routes/index");
const { auth } = require("express-openid-connect");

dotenv.load();

const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(
  session({
    name: process.env.SESSION_NAME || "express-openid-connect",
    keys: [process.env.SESSION_SECRET || "Set a SESSION_SECRET value in env"],
    maxAge: 24 * 60 * 60 * 1000,
    secure: process.env.NODE_ENV === "production"
  })
);

app.use(
  auth({
    required: false,
    auth0Logout: true,
    authorizationParams: {
      response_type: "code",
      response_mode: "form_post",
      baseURL: process.env.ISSUER_BASE_URL,
      audience: process.env.API_AUDIENCE,
      scope: "openid profile offline_access"
    }
  })
);

// Middleware to make the `user` object available for all views
app.use(function(req, res, next) {
  res.locals.user = req.openid.user;
  next();
});

app.use("/", router);

// Catch 404 and forward to error handler
app.use(function(req, res, next) {
  const err = new Error("Not Found");
  err.status = 404;
  next(err);
});

// Error handlers
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render("error", {
    message: err.message,
    error: process.env.NODE_ENV !== "production" ? err : {}
  });
});

const port = process.env.PORT || 3000;

http.createServer(app).listen(port, () => {
  console.log(`RWA backend listening on http://localhost:${port}`);
});
