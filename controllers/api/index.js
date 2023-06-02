const router = require("express").Router();
// need to import in other api routes
const userRoutes = require("./userRoutes");
// need to use the other imported api routes
router.use("/users", userRoutes);

module.exports = router;
