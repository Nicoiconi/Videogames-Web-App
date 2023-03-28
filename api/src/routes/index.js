const { Router } = require("express");
const axios = require("axios");
const { dbKey } = require("../../utils/config");
const { Videogame, Genre, Videogame_Genre } = require("../db");
const { getApiInfo } = require("./getApi");
const cloudinary =  require("../cloudinary/cloudinaryConection");


// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

const getTotalVideogames = async () => {
  const juegosDb = await Videogame.findAll();
  const juegosApi = await getApiInfo();

  if (juegosDb.length) {
    const total = [...juegosApi, ...juegosDb];
    return total;
    // return juegosDb
  } else {
    return juegosApi;
  }
};

// aca uno la ruta /videogames con la de query
router.get("/videogames", async (req, res) => {
  // - Obtener un listado de las primeros 15 videojuegos que contengan la palabra ingresada como query parameter
  // - Si no existe ningún videojuego mostrar un mensaje adecuado
  const name = req.query.name;

  const todosLosJuegos = await getTotalVideogames();

  if (name) {
    try {
      let game = todosLosJuegos.filter((vg) =>
        vg.name.toLowerCase().includes(name.toLowerCase())
      );
      // console.log(game); ok
      res.send(game);
    } catch (error) {
      console.log(error);
    }
  } else {
    res.send(todosLosJuegos);
  }
});

router.get("/videogames/db", async (req, res) => {
  // const todosLosJuegos = await getTotalVideogames();
  const dbGames = await Videogame.findAll();
  res.send(dbGames);
});

router.get("/videogames/api", async (req, res) => {
  // const todosLosJuegos = await getTotalVideogames();
  const apiGames = await getApiInfo();
  res.send(apiGames);
});

router.get("/videogames/:id", async (req, res) => {
  const idVg = req.params.id;
  // req.params?
  // - Obtener el detalle de un videojuego en particular
  // - Debe traer solo los datos pedidos en la ruta de detalle de videojuego
  // - Incluir los géneros asociados
  // include: { model: Genre }
  // - Imagen
  // - Nombre
  // - Géneros
  // - [ ] Descripción
  // - [ ] Fecha de lanzamiento
  // - [ ] Rating
  // - [ ] Plataformas

  if (!idVg.includes("-")) {
    try {
      const videogameByIdApi = await axios.get(
        `https://api.rawg.io/api/games/${idVg}?key=${dbKey}`
      );
      let {
        id,
        name,
        background_image,
        genres,
        description,
        released,
        rating,
        platforms,
      } = videogameByIdApi.data;
      genres = genres.map(g => g.name);
      description = description.replace(/(<([^>]+)>)/gi, ""); // gi = global insensitive
      rating = Math.round(rating);
      platforms = platforms.map((p) => p.platform.name);
      return res.json({
        id,
        name,
        background_image,
        genres,
        description,
        released,
        rating,
        platforms,
      });
    } catch (error) {
      console.log(error);
    }
  } else {
    let videogameByIdDb = await Videogame.findByPk(idVg);
    console.log(videogameByIdDb);
    res.json(videogameByIdDb);
  }
});

router.post("/videogames", async (req, res) => {
  // - Recibe los datos recolectados desde el formulario controlado de la ruta de creación de videojuego por body
  // - Crea un videojuego en la base de datos, relacionado a sus géneros.

  const videogame = req.body;
  try {
    
    const uploadResponse = await cloudinary.uploader.upload(videogame.image, {
      upload_preset: "Proyecto_Individual",
    });

    let vg = await Videogame.findOrCreate({
      where: {
        name: videogame.name,
        description: videogame.description,
        genres: videogame.genres,
        rating: Number(videogame.rating),
        platforms: videogame.platforms,
        img_url: uploadResponse.secure_url,
        img_public_id: uploadResponse.public_id,
      },
    });
    console.log(vg);
    // await vg.addGenres(videogame.genres);
    // await vg.setPlatforms(videogame.platforms)
    return res.json(vg);
  } catch (error) {
    console.log(error);
  }
});

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

router.get("/", async (req, res) => {
  const page = req.query.page; // page llega como string

  const gamesPerPage = 15;
  const juegosApi = await getApiInfo();
  const juegosDb = await Videogame.findAll({
    include: [{ model: Genre }],
  });
  const suma = [...juegosApi, ...juegosDb];

  if (typeof Number(page) === "number") {
    if (suma.length / gamesPerPage <= Number(page)) {
    }
  }
});

module.exports = router;
