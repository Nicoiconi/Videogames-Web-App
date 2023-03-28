const axios = require("axios");
const { dbKey } = require("../../utils/config");
const { Videogame, Genre } = require("../db");

const getFirstPage = async () => {
  const apiVideoGames = await axios.get(
    `https://api.rawg.io/api/games?key=${dbKey}`
  );
  const formatVideoGames = apiVideoGames.data.results.map((videojuego) => {
    return {
      apiId: videojuego.id,
      name: videojuego.name,
      image: videojuego.background_image,
      rating: Math.round(videojuego.rating),
      genres: videojuego.genres.map((g) => g.name),
      platforms: videojuego.platforms.map((p) => p.platform.name),
    };
  });
  return formatVideoGames;
};

const getSecondPage = async () => {
  const apiVideoGames = await axios.get(
    `https://api.rawg.io/api/games?key=${dbKey}&page=2`
  );
  const formatVideoGames = apiVideoGames.data.results.map((videojuego) => {
    return {
      apiId: videojuego.id,
      name: videojuego.name,
      image: videojuego.background_image,
      rating: Math.round(videojuego.rating),
      genres: videojuego.genres.map((g) => g.name),
      platforms: videojuego.platforms.map((p) => p.platform.name),
    };
  });
  return formatVideoGames;
};

const getThirdPage = async () => {
  const apiVideoGames = await axios.get(
    `https://api.rawg.io/api/games?key=${dbKey}&page=3`
  );
  const formatVideoGames = apiVideoGames.data.results.map((videojuego) => {
    return {
      apiId: videojuego.id,
      name: videojuego.name,
      image: videojuego.background_image,
      rating: Math.round(videojuego.rating),
      genres: videojuego.genres.map((g) => g.name),
      platforms: videojuego.platforms.map((p) => p.platform.name),
    };
  });
  return formatVideoGames;
};

const getFourthPage = async () => {
  const apiVideoGames = await axios.get(
    `https://api.rawg.io/api/games?key=${dbKey}&page=4`
  );
  const formatVideoGames = apiVideoGames.data.results.map((videojuego) => {
    return {
      apiId: videojuego.id,
      name: videojuego.name,
      image: videojuego.background_image,
      rating: Math.round(videojuego.rating),
      genres: videojuego.genres.map((g) => g.name),
      platforms: videojuego.platforms.map((p) => p.platform.name),
    };
  });
  return formatVideoGames;
};

const getFifthPage = async () => {
  const apiVideoGames = await axios.get(
    `https://api.rawg.io/api/games?key=${dbKey}&page=5`
  );
  const formatVideoGames = apiVideoGames.data.results.map((videojuego) => {
    return {
      apiId: videojuego.id,
      name: videojuego.name,
      image: videojuego.background_image,
      rating: Math.round(videojuego.rating),
      genres: videojuego.genres.map((g) => g.name),
      platforms: videojuego.platforms.map((p) => p.platform.name),
    };
  });
  return formatVideoGames;
};

const getApiInfo = async () => {
  const firstPage = await getFirstPage(),
    secondPage = await getSecondPage(),
    thirdPage = await getThirdPage(),
    fourthPage = await getFourthPage(),
    fifthPage = await getFifthPage();

  return [
    ...firstPage,
    ...secondPage,
    ...thirdPage,
    ...fourthPage,
    ...fifthPage,
  ];
};

module.exports = { getApiInfo };
