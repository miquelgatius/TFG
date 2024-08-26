const express = require("express");
const { signUp, login, getAllUsers } = require("../controllers/userController");
const router = express.Router();
//const { verifyToken } = require("../config/isAuth");

router.post("/signup", signUp);
router.post("/login", login);
//router.get("/allusers", verifyToken, getAllUsers); No ho necessito de moment
router.get("/allusers", getAllUsers);
module.exports = router;
