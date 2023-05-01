const express =require("express");
const router  = express.Router();
const{getUser,updateUser} = require("../controller/users");


  router.get("/find/:userid",getUser);
  router.put("/",updateUser);


module.exports = router;