const express =require("express");
const router  = express.Router();
const {getRelationships, addRelationships, deleteRelationships} = require("../controller/relationship");

router.get("/", getRelationships);
router.post("/", addRelationships);
router.delete("/",deleteRelationships);


module.exports = router;