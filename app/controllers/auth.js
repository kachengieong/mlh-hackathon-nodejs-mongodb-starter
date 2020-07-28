const express = require("express");
const models = require("../models");
const config = require("../../config");
const GitHub = require("../services/github");
const controllers = require("../controllers");
const router = express.Router();


router.get("/logout", function(req, res) {
  req.session.destroy();
  res.redirect("/");
});

router.get("/login/github", function(req, res) {
  const github = new GitHub({ client_id: config.githubClientId, client_secret: config.githubClientSecret });
  res.redirect(github.authorization_url("public_repo"));
});

router.get("/callback/github", async function(req, res) {
  if (!req.query.code) {
    return res.render("500");
  }

  // Fetch user from GitHub OAuth and store in session
  const github = new GitHub({ client_id: config.githubClientId, client_secret: config.githubClientSecret });
  const access_token = await github.get_token(req.query.code);

  console.log("Access token: " + access_token);

  if (!access_token) {
    return res.render("404");
  }

  // const user = await models.User.find_or_create_from_token(access_token);

  req.session.access_token = access_token;
 // req.session.user = user;

  return res.redirect("/");
});

module.exports = router;
