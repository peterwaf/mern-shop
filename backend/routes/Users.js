const express = require("express");
const router = express.Router();
//middlewares

const {findUser} = require("../middlewares/findUser");

//controllers

const {signUp} = require("../controllers/userControllers/signUpController");
const {logIn} = require("../controllers/userControllers/loginController");
const {loadUsers} = require("../controllers/userControllers/loadUsersController");
const {updateUser} = require("../controllers/userControllers/updateUserController");
const {deleteUser} = require("../controllers/userControllers/deleteUser");
const {verifyUser} = require("../controllers/userControllers/verifyUserController");
const {passResetNotice} = require("../controllers/userControllers/passResetNoticeController");
const {resetPassword} = require("../controllers/userControllers/resetPasswordController");

//signup

router.post("/api/v1/signup", signUp);

//login

router.post("/api/v1/login", logIn);

//get all users

router.get("/api/v1/users/all", loadUsers);

//update user

router.patch("/api/v1/users/:id", findUser, updateUser);

//delete user

router.delete("/api/v1/users/delete/:id", findUser, deleteUser);

//verify user

router.get("/api/v1/verify-account/:token", verifyUser);

//forgot password Notice

router.post("/api/v1/forgot-password-notice", passResetNotice);

//reset password

router.post("/api/v1/reset-password/:token", resetPassword);

module.exports = router;