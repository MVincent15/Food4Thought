const router = require("express").Router();
const { Recipe, User } = require("../models");
const withAuth = require("../utils/auth");

router.get("/", async (req, res) => {
  try {
    res.render("homepage");
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get("/dashboard", withAuth, async (req, res) => {
  try {
    const userRecipeData = await Recipe.findAll({
      where: {
        user_id: req.session.user_id,
      },
      include: {
        model: User,
        attributes: {
          exclude: ["password"],
        },
      },
    });
    const recipes = userRecipeData.map((recipe) => recipe.get({ plain: true }));
    console.log(recipes);

    res.render("dashboard", { recipes, loggedIn: req.session.loggedIn });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get("/login", (req, res) => {
    if (req.session.loggedIn) {
      res.redirect("/");
      return;
    }
  
    res.render("login");
  });

  router.get("/signup", (req, res) => {
    if (req.session.loggedIn) {
      res.redirect("/");
      return;
    }
  
    res.render("signUp");
  });

module.exports = router;
