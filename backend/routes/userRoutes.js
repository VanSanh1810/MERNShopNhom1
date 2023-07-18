const express = require("express");
const {registerValidations,loginValidations} = require("../validations/userValidations");
const {register, login, getCustomer} = require("../controllers/usersController");
const Authorization = require("../services/Authorization");
const router = express.Router();
router.get("/customers/:page", Authorization.authorized, getCustomer);
router.post("/register",registerValidations, register);
router.post('/login',loginValidations, login);
module.exports = router;