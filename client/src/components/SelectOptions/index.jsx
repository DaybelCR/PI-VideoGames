import React, { useEffect } from 'react';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';

import {getGenres,filterName,filterRating,filterData,filterGenres}  from '../../redux/actions';

export  function Select({genres,getGenres,filterName,filterRating,filterData,filterGenres}) {
 
 useEffect(()=>
 getGenres(),[getGenres])
 
function handleFilterName(e){
filterName(e.target.value);

}
function handleFilterRating(e){
filterRating(e.target.value);
}
function handleFilterGenre(e){
  filterGenres(e.target.value);
}
function handleFilterData(e){
filterData(e.target.value);
}

  return (
    <>
        <div>
         <h3><Link to="/create/game">Create Game</Link></h3>
         <span>Order by:</span>
         <label >Name:</label>
         <select  onChange={(e)=>handleFilterName(e)} >
             <option value="">Select an option</option>
             <option value="a-z">A-Z</option>
             <option value="z-a">Z-A</option>
          </select>
          <label >Rating:</label>
          <select  onChange={(e)=>handleFilterRating(e)} >
             <option value="">Select an option</option>
             <option value="l-h">Lowest to Highest</option>
             <option value="h-l">Highest to Lowest</option>
          </select>
          <label >Genres:</label>
          <select  onChange={(e)=>handleFilterGenre(e)}>
             <option value="All">All</option>
             {genres&& genres?.map(g=>(<option key={g.id} value={g.id}>{g.name}</option>))}
          </select>
          <label >Data:</label>
          <select  onChange={(e)=>handleFilterData(e)}>
             <option value="All">All</option>
             <option value="Api">API</option>
             <option value="Database">DataBase</option>
          </select>
        </div>
    </>
  );
}


function mapStateToProps(state){
  return {
    genres:state.genres
  }
}

  export default connect(mapStateToProps,
{getGenres,filterName,filterRating,filterData,filterGenres})(Select)