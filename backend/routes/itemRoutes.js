const router = require("express").Router();
const { getItems, createItem } = require("../controllers/itemController");

router.get("/", getItems);
router.post("/", createItem); // Admin only in future

module.exports = router;
