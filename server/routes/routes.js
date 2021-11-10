const express = require("express");
const {
  getMessages,
  getuserbyid,
  getchatHistory,
  getChangedNum,
  deleteUser,
  userSigningIn,
} = require("../controllers/index.js");
const router = express.Router();
router.get("/", getMessages);
router.post("/signin", userSigningIn);
router.get("/:id", getuserbyid);
router.post("/:id", getChangedNum);
router.post("/delete/:id", deleteUser);
router.get("/history/:id", getchatHistory);
module.exports = router;
