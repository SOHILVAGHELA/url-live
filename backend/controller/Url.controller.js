const URL = require("../model/Url.model");

async function shortenUrl(req, res) {
  let nanoid = null;
  try {
    // Dynamically import nanoid
    const { nanoid: importedNanoid } = await import("nanoid");
    nanoid = importedNanoid;
  } catch (error) {
    console.error("Error importing nanoid:", error);
    return res.status(500).json({ error: "Failed to import nanoid" });
  }

  const { originalUrl } = req.body;

  if (!originalUrl) {
    return res.status(400).json({ error: "URL is required" });
  }

  const shortId = nanoid(7); // Adjust the length as per your requirements

  try {
    // Check if the original URL already exists in the database
    let url = await URL.findOne({ originalUrl });

    if (url) {
      return res.json(url);
    } else {
      // Create a new entry for the URL
      url = new URL({
        originalUrl,
        shortId,
      });
      await url.save();
      return res.json(url);
    }
  } catch (error) {
    console.error("Error shortening URL:", error);
    return res.status(500).json({ error: "Failed to shorten URL" });
  }
}

async function redirectToOriginalUrl(req, res) {
  const { shortId } = req.params;

  try {
    // Find the URL entry with the given short ID
    const url = await URL.findOne({ shortId });

    if (!url) {
      return res.status(404).json({ error: "Short URL not found" });
    }

    // Redirect to the original URL
    return res.redirect(url.originalUrl);
  } catch (error) {
    console.error("Error redirecting:", error);
    return res.status(500).json({ error: "Failed to redirect" });
  }
}

module.exports = { shortenUrl, redirectToOriginalUrl };
