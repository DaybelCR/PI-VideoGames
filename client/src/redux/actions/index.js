import { CLEAR_DETAIL, FILTER_NAME,GET_NAME_GAMES, GET_DETAIL, GET_GAMES, GET_GENRES } from "./actionTypes.js";

export function getGames(){
    return  async function(dispatch){
        return fetch('http://localhost:3001/videogames')
                    .then(response=>response.json())
                    .then(data=> dispatch({
                        type:GET_GAMES,
                        payload:data,
                    }))
    }
}

export function getNameGame(name){
    return  async function(dispatch){
        return fetch(`http://localhost:3001/videogames?name=${name}`)
                    .then(response=>response.json())
                    .then(data=> dispatch({
                        type:GET_NAME_GAMES,
                        payload:data,
                    }))
    }
}

export function getGenres(){
    return  async function(dispatch){
        return fetch('http://localhost:3001/genres')
                    .then(response=>response.json())
                    .then(data=> dispatch({
                        type:GET_GENRES,
                        payload:data,
                    }))
    }
}

export function getGameDetail(id){
    return  async function(dispatch){
        return fetch(`http://localhost:3001/videogame/${id}`)
                    .then(response=>response.json())
                    .then(data=> dispatch({
                        type:GET_DETAIL,
                        payload:data,
                    }))
    }
}


export function clearDetail(){
  return{
    type:CLEAR_DETAIL
  }
    
}

export function filterName(){
 return{
    type:FILTER_NAME
 }
}




