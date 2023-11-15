const express = require("express");
const router = express.Router();
const { getmain, upload } = require("../controllers/homeController");

router.get("/", getmain);

router.post("/upload", upload.single("picture"), (req, res) => {
	res.send("correct");
});

module.exports = router;
