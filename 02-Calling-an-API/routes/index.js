const router = require("express").Router();
const request = require("request-promise");
const { requiresAuth } = require("express-openid-connect");

router.get("/", function(req, res, next) {
  res.render("index", {
    title: "Auth0 Webapp sample Nodejs",
    isAuthenticated: req.isAuthenticated()
  });
});

router.get("/profile", requiresAuth(), function(req, res, next) {
  res.render("profile", {
    userProfile: JSON.stringify(req.openid.user, null, 2),
    title: "Profile page"
  });
});

router.get("/api", requiresAuth(), async (req, res, next) => {
  let apiData = {};
  let tokenSet = req.openid.tokens;

  if (tokenSet.expired() && tokenSet.refresh_token) {
    try {
      tokenSet = await req.openid.client.refresh(tokenSet);
    } catch (err) {
      next(err);
    }

    tokenSet.refresh_token = req.openid.tokens.refresh_token;
    req.openid.tokens = tokenSet;
  }

  try {
    apiData = await request(`${process.env.API_URL}/api/external`, {
      headers: { authorization: `Bearer ${tokenSet.access_token}` },
      json: true
    });
  } catch (err) {
    next(err);
  }

  res.render("api", {
    apiPath: `${process.env.API_URL}/api/external`,
    apiResponse: JSON.stringify(apiData, null, 2),
    title: "API page"
  });
});

module.exports = router;
