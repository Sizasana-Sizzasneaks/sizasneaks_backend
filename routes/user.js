var express = require("express");
const router = express.Router();

//Verify User ID
const verifyUserIdToken = require("../controllers/user/functions/verifyUserIdToken.js");

//Get User Profile Data
const getUser = require("../controllers/user/getUser.js");
router.get("/", verifyUserIdToken, getUser);


//Create new User Profile
const postUser = require("../controllers/user/postUser.js");
router.post("/", verifyUserIdToken, postUser);


//Update User Profile
const patchUser = require("../controllers/user/patchUser.js");
router.patch("/", verifyUserIdToken, patchUser);



module.exports = router;