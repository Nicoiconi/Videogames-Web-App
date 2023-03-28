import axios from "axios";

import {
  GET_PLAT
} from "../constantes";

export function getPlatforms() {
  return async function (dispatch) {
    try {
      const platforms = await axios.get("http://localhost:3001/platforms", {});
      dispatch({ type: GET_PLAT, payload: platforms.data });
    } catch (error) {
      console.log(error);
    };
  };
};