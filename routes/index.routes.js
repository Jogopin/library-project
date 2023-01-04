const express = require('express');
const router = express.Router();

/* GET home page */
router.get("/", (req, res, next) => {
  // req.session.currentUser
  // res.render("index",{userInSession:req.session.currentUser,layout: 'otracosa'}); // we can change the layout
  res.render("index");
});

module.exports = router;
