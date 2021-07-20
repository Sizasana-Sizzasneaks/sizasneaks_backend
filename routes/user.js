var express = require("express");
const router = express.Router();

//Get User Profile Data
const getUser = require("../controllers/user/getUser.js");
router.get("/", getUser);


//Create new User Profile
const postUser = require("../controllers/user/postUser.js");
router.post("/", postUser);


//Update User Profile
const patchUser = require("../controllers/user/patchUser.js");
router.patch("/", patchUser);



module.exports = router;