import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';
import Nav from '../Nav';
import SearchBar from '../SearchBar';
import Cards from '../CardsGames';


import {getGenres}  from '../../redux/actions';




export  function Home(props) {
// const [select,setSelect]=useState({

// });
 useEffect(()=>
 props.getGenres(),[])

  return (
    <>
     <Nav/>
        <div>
         <h3><Link to="/create/game">Create Game</Link></h3>
         <span>Order by:</span>
         <label >Name:</label>
         <select name="name" id="name"  onChange={(e)=>console.log(e)} >
             <option value="all">All</option>
             <option value="a-z">A-Z</option>
             <option value="z-a">Z-A</option>
          </select>
          <label >Rating:</label>
          <select name="rating" id="rating" >
             <option value="all">All</option>
             <option value="l-h">Lowest to Highest</option>
             <option value="h-l">Highest to Lowest</option>
          </select>
          <label >Genres:</label>
          <select name="genres" id="genres">
             <option value="all">All</option>
             {props.genres&& props.genres?.map(g=>(<option key={g.id} value={g.id}>{g.name}</option>))}
          </select>
          <label >Data:</label>
          <select name="data" id="data" >
             <option value="all">All</option>
             <option value="api">API</option>
             <option value="database">DataBase</option>
          </select>
        </div>
      <SearchBar/>
      <Cards/>
    </>
  );
}


function mapStateToProps(state){
  return {
    genres:state.genres
  }
  }

  export default connect(mapStateToProps,{getGenres})(Home)