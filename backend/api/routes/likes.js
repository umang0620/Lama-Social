const express =require("express");
const router  = express.Router();
const {getLikes, addLikes, deleteLikes} = require("../controller/likes");

router.get("/", getLikes);
router.post("/", addLikes);
router.delete("/",deleteLikes);


module.exports = router;