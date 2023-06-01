const router = require("express").Router();
const { Recipe, User } = require("../models");
const withAuth = require("../utils/auth");

router.get("/", async (req, res) => {
  try {
    res.render("homepage", {
        loggedIn: req.session.loggedIn
    });
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

    console.log(req.session.user_id);

    const recipes = userRecipeData.map((recipe) => recipe.get({ plain: true }));
    console.log({ recipes });

    res.render("dashboard", { recipes, loggedIn: req.session.loggedIn });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get("/dashboard/addrecipe", async (req, res) => {
  try {
    res.render("addRecipe", {
        loggedIn: req.session.loggedIn
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.post("/dashboard/addrecipe", withAuth, async (req, res) => {
  try {
    const newRecipe = await Recipe.create({
      name: req.body.title,
      ingredients: req.body.ingredients,
      directions: req.body.directions,
      cook_time: req.body.cookTime,
      comments: req.body.comments,
      user_id: req.session.user_id,
    });

    res.status(200).json(newRecipe);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.get("/dashboard/updaterecipe/:id", async (req, res) => {
  try {
    const recipeData = await Recipe.findByPk(req.params.id, {
      include: [{ model: User,
      attributes: {
        exclude: ["password"],
      }}]
    });
    
    const recipe = recipeData.get({ plain: true });

    res.render("updateRecipe", {
        recipe: recipe,
        loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.put("/dashboard/updaterecipe/:id", withAuth, async (req, res) => {
  try {
    const recipeData = await Recipe.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    if(!recipeData[0]) {
      res.status(404).json({message: 'No recipe found!'});
      return;
    }

    res.render("dashboard", { recipeData, loggedIn: req.session.loggedIn });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.delete("/dashboard/deleterecipe/:id", withAuth, async (req, res) => {
  try {
    const recipeData = await Recipe.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!recipeData) {
      res.status(404).json({ message: "No recipe found!" });
      return;
    }

    res.status(200).json(recipeData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/recipebook", withAuth, async (req, res) => {
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

    console.log(req.session.user_id);

    const recipes = userRecipeData.map((recipe) => recipe.get({ plain: true }));
    console.log({ recipes });

    res.render("recipeBook", { recipes, loggedIn: req.session.loggedIn });
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
