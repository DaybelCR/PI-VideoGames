import React, { useEffect} from 'react';
import { useDispatch, useSelector} from 'react-redux';

import s from './Select.module.css';

import {getGenres,filterName,filterRating,filterData,filterGenres}  from '../../redux/actions';

export default function Select({pageCurrent,setOrder}) {

const genres=useSelector(state=>state.genres);

const dispatch=useDispatch();
 useEffect(()=>
 dispatch(getGenres()),[dispatch])
 
function handleFilterName(e){
e.preventDefault();
dispatch(filterName(e.target.value));
pageCurrent(1);
setOrder(`Ordenado por ${e.target.value}`)
}
function handleFilterRating(e){
e.preventDefault();
dispatch(filterRating(e.target.value));
pageCurrent(1);
setOrder(`Ordenado por ${e.target.value}`)
}
function handleFilterGenre(e){
dispatch(filterGenres(e.target.value));
pageCurrent(1);
}
function handleFilterData(e){
dispatch(filterData(e.target.value));
pageCurrent(1);
}

  return (
        <div className={s.select}>
         <span>Order by:</span>
         <div className={s.options}>
         <div className={s.item}>
         <label >Name:</label>
         <select  onChange={(e)=>handleFilterName(e)} >
             <option value="" >Select an option</option>
             <option value="a-z">A-Z</option>
             <option value="z-a">Z-A</option>
         </select>
         </div>
         <div className={s.item}>
         <label >Rating:</label>
          <select  onChange={(e)=>handleFilterRating(e)} >
             <option value="" >Select an option</option>
             <option value="l-h">Lowest to Highest</option>
             <option value="h-l">Highest to Lowest</option>
          </select>
          </div>
          <div className={s.item}>
          <label >Genres:</label>
          <select  onChange={(e)=>handleFilterGenre(e)}>
             <option value="All" >All</option>
             {genres&& genres?.map(g=>(<option key={g.id} value={g.name}>{g.name}</option>))}
          </select>
          </div>
          <div className={s.item}>
          <label >Data:</label>
          <select  onChange={(e)=>handleFilterData(e)}>
             <option value="All" >All</option>
             <option value="Api">API</option>
             <option value="Database">DataBase</option>
          </select>
         </div>
         </div>
        </div>
  );
}
