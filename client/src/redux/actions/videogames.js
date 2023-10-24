import axios from "axios";

import {
  GET_ALL_VG,
  GET_DB_VGS,
  GET_API_VGS,
  GET_VG_BY_NAME,
  GET_VG_BY_ID,
  ORDER_BY,
  FILTER_BY,
  RATING_BY
} from "../constantes";


export function getAllVideogames() {
  return async function (dispatch) {
    try {
      let allGames = await axios.get("http://localhost:3001/videogames", {});
      dispatch({ type: GET_ALL_VG, payload: allGames.data })
    } catch (error) {
      console.log(error);
    };
  };
};

export function getDbVideogames() {
  return async function (dispatch) {
    try {
      let dbGames = await axios.get("http://localhost:3001/videogames/db", {});
      dispatch({ type: GET_DB_VGS, payload: dbGames.data });
    } catch (error) {
      console.log(error);
    };
  };
};

export function getApiVideogames() {
  return async function (dispatch) {
    try {
      let apiGames = await axios.get("http://localhost:3001/videogames/api", {});
      dispatch({ type: GET_API_VGS, payload: apiGames.data });
    } catch (error) {
      console.log(error);
    };
  };
};

export function getVideogameByName(name) {
  return async function (dispatch) {
    try {
      let videogameByName = await axios.get(`http://localhost:3001/videogames?name=${name}`, {});
      dispatch({ type: GET_VG_BY_NAME, payload: videogameByName.data });
    } catch (error) {
      console.log(error);
    };
  };
};

export function getVideogameByID(id) {
  return async function (dispatch) {
    try {
      let videogameById = await axios.get(`http://localhost:3001/videogames/${id}`, {});
      dispatch({ type: GET_VG_BY_ID, payload: videogameById.data });
    } catch (error) {
      console.log(error);
    };
  };
};

export function createVideogame(payload) {
  return async function () {
    try {
      const response = await axios.post("http://localhost:3001/videogames", payload);
      console.log(response);
      return response;
    } catch (error) {
      console.log(error);
    };
  };
};

export function filterBy(filter) {
  return function (dispatch) {
    dispatch({ type: FILTER_BY, payload: filter });
  };
};

export function orderBy(order) {
  return function (dispatch) {
    dispatch({ type: ORDER_BY, payload: order });
  };
};

export function ratingBy(order) {
  return function (dispatch) {
    dispatch({ type: RATING_BY, payload: order});
  };
};