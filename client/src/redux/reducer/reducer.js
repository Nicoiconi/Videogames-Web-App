import {
  GET_ALL_VG,
  GET_DB_VGS,
  GET_API_VGS,
  GET_VG_BY_ID,
  GET_VG_BY_NAME,
  GET_GENRES,
  GET_PLAT,
  // CLEAR_VG_BY_FORM,
  RATING_BY,
  ORDER_BY,
  FILTER_BY,
} from "../constantes";

let initialState = {
  allVideogames: [],
  dbVideogames: [],
  apiVideogames: [],
  gamesBackUp: [],
  gameDetails: {},
  filtered: [],
  allPlatforms: [],

};

export default function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_VG:
      return {
        ...state,
        allVideogames: action.payload,
        filtered: action.payload,
      };
    case GET_DB_VGS:
      return {
        ...state,
        dbVideogames: action.payload
      };
    case GET_API_VGS:
      return {
        ...state,
        apiVideogames: action.payload
      };
    case GET_VG_BY_NAME:
      return {
        ...state,
        filtered: action.payload,
      };
    case GET_GENRES:
      return {
        ...state,
        genres: action.payload,
      };
    case GET_PLAT:
      return {
        ...state,
        platforms: action.payload,
      };
    case GET_VG_BY_ID:
      return {
        ...state,
        gameDetails: action.payload,
      };
    case FILTER_BY:
      if (action.payload === "DB") {
        return {
          ...state,
          filtered: state.dbVideogames,
        };
      } else if (action.payload === "API") {
        return {
          ...state,
          filtered: state.apiVideogames,
        }
      } else {
        return { ...state, filtered: state.allVideogames }; // deberia ser el default
      }
    // eslint-disable-next-line no-fallthrough
    case ORDER_BY:
      if (action.payload === "A-Z") {
        return {
          ...state,
          filtered: [...state.filtered].sort((a, b) => {
            if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
            if (b.name.toLowerCase() > a.name.toLowerCase()) return -1;
            return 0;
          })
        };
      }
      if (action.payload === "Z-A") {
        return {
          ...state,
          filtered: [...state.filtered].sort((a, b) => {
            if (a.name.toLowerCase() > b.name.toLowerCase()) return -1;
            if (b.name.toLowerCase() > a.name.toLowerCase()) return 1;
            return 0;
          })
        };
      }
    // eslint-disable-next-line no-fallthrough
    case RATING_BY:
      if (action.payload === "mejor") {
        return {
          ...state,
          filtered: [...state.filtered].sort((a, b) => {
            if (a.rating < b.rating) return 1;
            if (b.rating < a.rating) return -1;
            return 0;
          }),
        };
      }
      if (action.payload === "peor") {
        return {
          ...state,
          filtered: [...state.filtered].sort((a, b) => {
            if (b.rating > a.rating) return -1;
            if (a.rating > b.rating) return 1;
            return 0;
          }),
        };
      }
      return {
        ...state,
        filtered: [...state.filtered],
      };

    // eslint-disable-next-line no-fallthrough
    default:
      return {
        ...state,
      };
  }
}
