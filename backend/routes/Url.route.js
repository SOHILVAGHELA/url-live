const express = require("express");
const router = express.Router();
const {
  shortenUrl,
  redirectToOriginalUrl,
} = require("../controller/Url.controller");

// POST /api/url/shorten
router.post("/shorten", shortenUrl);

// GET /api/url/:shortId
router.get("/:shortId", redirectToOriginalUrl);

module.exports = router;
