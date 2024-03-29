import { CLEAR_DETAIL, FILTER_NAME,FILTER_DATA,FILTER_GENRES,
    FILTER_RATING,ON_SEARCH_GAMES_NAME, GET_DETAIL, GET_GAMES, 
    GET_GENRES, GET_PLATFORMS,URL_MAIN } 
    from "./actionTypes.js";

import axios from 'axios';

export function getGames(){
    return  async function(dispatch){
        return fetch(`${URL_MAIN}/videogames`)
                    .then(response=>response.json())
                    .then(data=> dispatch({
                        type:GET_GAMES,
                        payload:data,
                    }))
    }
}

export function onSearchGameName(name){
    // if(!name||name.length<4) return alert('Escribe un nombre mayor a 3 caracteres');
    return  async function(dispatch){
        return fetch(`${URL_MAIN}/videogames?name=${name}`)
                    .then(response=>response.json())
                    .then(data=>{
                        if(Array.isArray(data)){
                         dispatch({type:ON_SEARCH_GAMES_NAME,payload:data })
                        }else{
                              return alert(data.message);
                        }
                    }
                    )
    }
}

export function getGenres(){
    return  async function(dispatch){
        return fetch(`${URL_MAIN}/genres`)
                    .then(response=>response.json())
                    .then(data=> dispatch({
                        type:GET_GENRES,
                        payload:data,
                    }))
    }
}

export function getPlatforms(){
    return  async function(dispatch){
        return fetch(`${URL_MAIN}/platforms`)
                    .then(response=>response.json())
                    .then(data=> dispatch({
                        type:GET_PLATFORMS,
                        payload:data,
                    }))
    }
}

export function getGameDetail(id){
    return  async function(dispatch){
        return fetch(`${URL_MAIN}/videogame/${id}`)
                    .then(response=>response.json())
                    .then(data=> dispatch({
                        type:GET_DETAIL,
                        payload:data,
                    }))
    }
}

export function createVideogames(payload){
    return async function(dispatch){
        // eslint-disable-next-line
        const response =await axios.post(`${URL_MAIN}/videogames`,payload);
        return payload;
    }
}

export function clearDetail(){
  return{
    type:CLEAR_DETAIL,
  }
    
}

export function filterName(payload){
 return{
    type:FILTER_NAME,
    payload
 }
}

export function filterData(payload){
    return{
       type:FILTER_DATA,
       payload
    }
   }
   export function filterRating(payload){
    return{
       type:FILTER_RATING,
       payload
    }
   }
 export function filterGenres(payload){
    return{
        type:FILTER_GENRES,
        payload
    }
 }


