import { GET_GAMES, GET_GENRES ,GET_DETAIL, CLEAR_DETAIL,FILTER_NAME} from "../actions/actionTypes.js";
const initialState={
    genres:[],
    games:[],
    gameDetail:{}
} 

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_GAMES:
      return {
        ...state,
        games: action.payload,
      };
    case GET_GENRES:
      return {
        ...state,
        genres: action.payload,
      };
    case GET_DETAIL:
      return {
        ...state,
        gameDetail: action.payload,
      };
    case CLEAR_DETAIL:
        return {
          ...state,
          gameDetail: {},
        };
    case FILTER_NAME:
        return {
          ...state,
          games:state.games.sort(),
        };
    default:
      return {
        ...state,
      };
  }
}

export default rootReducer;