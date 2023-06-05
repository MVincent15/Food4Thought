const router = require("express").Router();
const { Recipe, User } = require("../models");
const withAuth = require("../utils/auth");
const { Op } = require("sequelize");
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.API_SECRET,
});

router.get("/", async (req, res) => {
  try {
    res.render("homepage", {
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.log(err);
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

    const recipes = userRecipeData.map((recipe) => {
      const {
        id,
        name,
        ingredients,
        directions,
        cook_time,
        comments,
        image_url,
      } = recipe.get({ plain: true });
      if (image_url !== null && image_url.trim().length !== 0) {
        const cloudinaryUrl = cloudinary.url(image_url, {
          width: 100,
          height: 100,
          crop: "fill",
        });

        return {
          id: id,
          name: name,
          ingredients: ingredients,
          directions: directions,
          cook_time: cook_time,
          comments: comments,
          image_url: cloudinaryUrl,
        };
      } else {
        return {
          id: id,
          name: name,
          ingredients: ingredients,
          directions: directions,
          cook_time: cook_time,
          comments: comments,
          image_url: image_url,
        };
      }
    });

    console.log({ recipes });

    res.render("recipeBook", { recipes, loggedIn: req.session.loggedIn });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get("/recipes/search/:name", async (req, res) => {
  try {
    const name = req.params.name;
    const recipes = await Recipe.findAll({
      where: {
        name: {
          [Op.like]: `%${name}%`,
        },
      },
    });

    res.json(recipes);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error");
  }
});

router.get("/recipe/:id", async (req, res) => {
  try {
    const recipeData = await Recipe.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: {
            exclude: ["password"],
          },
        },
      ],
    });

    const recipe = recipeData.get({ plain: true });
    console.log(recipe);
    if (recipe.image_url && recipe.image_url.trim().length > 0) {
      const image_url = recipe.image_url;
      const cloudinaryUrl = cloudinary.url(image_url, {
        width: 300,
        height: 300,
        crop: "fill",
      });
      recipe.image_url = cloudinaryUrl;
    }
    
    res.render("searchRecipeCard", {
      recipe: recipe,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get("/addrecipe", async (req, res) => {
  try {
    res.render("addRecipe", {
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.post("/addrecipe", withAuth, async (req, res) => {
  try {
    if (
      !req.body.title ||
      !req.body.ingredients ||
      !req.body.directions ||
      !req.body.cookTime
    ) {
      return res.status(400).json({ error: "Missing required fields" });
    }
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

router.get("/updaterecipe/:id", async (req, res) => {
  try {
    const recipeData = await Recipe.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: {
            exclude: ["password"],
          },
        },
      ],
    });

    if (!recipeData) {
      return res.status(404).json({ error: "Recipe not found" });
    }
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

router.put("/updaterecipe/:id", withAuth, async (req, res) => {
  try {
    const recipeData = await Recipe.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    if (!recipeData[0]) {
      res.status(404).json({ message: "No recipe found!" });
      return;
    }

    res.render("recipeBook", { recipeData, loggedIn: req.session.loggedIn });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.delete("/deleterecipe/:id", withAuth, async (req, res) => {
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

router.get("/search", async (req, res) => {
  try {
    const key = req.query.key;
    const attribute = req.query.attribute;
    const recipes = await Recipe.findAll({
      where: {
        user_id: req.session.user_id,
        [attribute]: {
          [Op.like]: `%${key}%`,
        },
      },
    });

    const results = recipes.map((recipe) => ({
      label: recipe.name,
      value: recipe.name,
      id: recipe.id,
    }));

    res.json(results);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
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
