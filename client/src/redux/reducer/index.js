import {POST_VIDEOGAMES, GET_GAMES, GET_GENRES ,GET_DETAIL, CLEAR_DETAIL,ON_SEARCH_GAMES_NAME,FILTER_NAME,FILTER_DATA,FILTER_GENRES,FILTER_RATING,GET_PLATFORMS} from "../actions/actionTypes.js";

const initialState={
    genres:[],
    games:[],
    platforms:[],
    allVideoGames:[],
    gameDetail:{}
} 

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_GAMES:
      return {
        ...state,
        games: action.payload,
        allVideoGames:action.payload,
      };
    case GET_GENRES:
      return {
        ...state,
        genres: action.payload,
      };
    case GET_PLATFORMS:
        return {
          ...state,
          platforms: action.payload,
        };
    case GET_DETAIL:
      return {
        ...state,
        gameDetail: action.payload,
      };
    case CLEAR_DETAIL:
        return{
          ...state,
          gameDetail:{}
        };
    case ON_SEARCH_GAMES_NAME:
        return {
          ...state,
          games: action.payload,
        };
    case FILTER_NAME:
      const nameFiltered=action.payload==='a-z'?
        state.games.sort((a,b)=>{
        if(a.name.toLowerCase()<b.name.toLowerCase()) return -1;
        if(a.name.toLowerCase()>b.name.toLowerCase()) return 1;
        return 0;
      }):state.games.sort((a,b)=>{
        if(a.name.toLowerCase()<b.name.toLowerCase()) return 1;
        if(a.name.toLowerCase()>b.name.toLowerCase()) return -1;
        return 0;
      })
        return {
            ...state,
            games:  nameFiltered,
        };
    case FILTER_DATA:
      const allVideoGames=state.allVideoGames;
      const dataFiltered=action.payload==='Api'?
      allVideoGames.filter(e=>e.created!==true):
      allVideoGames.filter(e=>e.created===true)
      return {
              ...state,
              games:action.payload==='All'?state.allVideoGames:dataFiltered,
        };
    case FILTER_GENRES:
      const allVideoGames2=state.allVideoGames;
      const genreFiltered=action.payload==='All'?allVideoGames2:
      allVideoGames2.filter(obj=>obj.genres.find(nameGenre=>(nameGenre)===action.payload))
      return {
              ...state,
              games: genreFiltered,
      };
    case FILTER_RATING:
      const ratingFiltered=action.payload==='l-h' ?
      state.games.sort((a,b)=>a.rating-b.rating):
      state.games.sort((a,b)=>b.rating-a.rating)
      return {
                ...state,
                games: ratingFiltered
      };
    case POST_VIDEOGAMES:
      return {
        ...state
    }
    default:
      return {
        ...state,
      };
  }
}

export default rootReducer;