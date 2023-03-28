const { Router } = require("express");
const axios = require("axios");
const { dbKey } = require("../../utils/config");

const router = Router();


router.get("/genres", async (req, res) => {
  // - Obtener todos los tipos de géneros de videojuegos posibles
  // - En una primera instancia deberán traerlos desde rawg y guardarlos en su propia base de datos y luego ya utilizarlos desde allí

  try {
    //con Prmise
    // axios.get("").then(res => map)
    const apiGenres = await axios.get(
      `https://api.rawg.io/api/genres?key=${dbKey}`
    );
    const formatGenres = apiGenres.data.results.map((gender) => {
      const obj = {
        id: gender.id,
        name: gender.name,
      };
      return obj;
    });

    res.json(formatGenres); // no retorno formatGenres xq se aplica en api/index
  } catch (error) {
    res.sendStatus(404);
  }
});

module.exports = router;
