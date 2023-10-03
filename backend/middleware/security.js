export const verifyApiKey = async (req, res, next) => {
  try {
    const apiKey = req.headers["api-key"];

    if (!apiKey || apiKey !== process.env.API_KEY) {
      return res.status(403).json({ error: "Forbidden" });
    }

    next();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
