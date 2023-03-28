const { Router } = require("express");
const axios = require("axios");
const { dbKey } = require("../../utils/config");
const { getApiInfo } = require("./apiVideogames");

const router = Router();

router.get("/platforms", async (req, res) => {
  try {
    const apiPlatforms = await axios.get(
      `https://api.rawg.io/api/platforms?key=${dbKey}`
    );
    const formatPlatforms = apiPlatforms.data.results.map((p) => {
      const obj = {
        id: p.id,
        name: p.name,
      };
      return obj;
    });
    res.json(formatPlatforms);
  } catch (error) {
    res.sendStatus(404);
  }
});

module.exports = router;
