const router = require("express").Router();
// need to import in other api routes
const userRoutes = require("./userRoutes");
const recipeRoutes = require("./recipeRoutes");
// need to use the other imported api routes
router.use("/users", userRoutes);
router.use("/recipes", recipeRoutes);

module.exports = router;
