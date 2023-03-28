import axios from "axios";

import {
  GET_GENRES
} from "../constantes";

export function getGenres() {
  return async function (dispatch) {
    try {
      const genres = await axios.get("http://localhost:3001/genres");
      dispatch({ type: GET_GENRES, payload: genres.data });
    } catch (error) {
      console.log(error);
    };
  };
};