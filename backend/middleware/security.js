const API_KEY = "tmp_api_key";

export const verifyApiKey = async (req, res, next) => {
  try {
    const apiKey = req.headers["api-key"];

    if (!apiKey || API_KEY !== apiKey) {
      return res.status(403).json({ error: "Forbidden" });
    }

    next();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
