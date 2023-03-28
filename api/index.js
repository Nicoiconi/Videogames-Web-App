//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const server = require("./src/app");
const { conn } = require("./src/db");
const axios = require("axios");
const { dbKey } = require("./utils/config");
const { Platform, Genre } = require("./src/db");

async function preChargeGenres(){
  const apiGenres = await axios.get(`https://api.rawg.io/api/genres?key=${dbKey}`);
  const formatGenres = apiGenres.data.results.map(genre => {
    const obj = {
      id: genre.id,
      name: genre.name
    };
    return obj;
  });
  Genre.bulkCreate(formatGenres);
};

async function preChargePlatforms(){
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
  Platform.bulkCreate(formatPlatforms);
};

conn.sync({force: true}).then(async() => {
  await preChargeGenres();
  await preChargePlatforms();
  server.listen(3001, () => {
    console.log("Listening on port 3001")
  });
});
