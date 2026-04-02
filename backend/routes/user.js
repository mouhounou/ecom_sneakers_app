const usertRouter = require("express").Router();
const userController = require("../controllers/user");
const verifyToken = require("../middleware/verifyToken");


usertRouter.get("/", verifyToken,  userController.getUser);
usertRouter.delete("/",verifyToken, userController.deleteUser);

module.exports = usertRouter;
