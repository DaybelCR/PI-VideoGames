import React, { useEffect,useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Card from '../CardGame';
import {getGames}  from '../../redux/actions';
import s from './Cards.module.css';

export default function Cards() {
const games=useSelector((state)=>state.games);
const dispatch=useDispatch();

const [page,setPage]=useState(1);
const perPage=15;

useEffect(()=>{
  dispatch(getGames());
},[dispatch])
const max= Math.ceil(games.length/perPage);
const gamesPerPage=games.slice((page-1)*perPage,(page-1)*perPage+perPage); //0,15//15,30//30,45...
let arr=[];
for(let i=1;i<=max;i++){
 arr.push(i)
}
function previusPage(){
    setPage(()=>page-1);
 }
 function nextPage(){
    setPage(()=>page+1);
 }
 function pageCurrent(pag){
   setPage(()=>pag);
 }

    if(games.length!==0){
    return (
      <>
      <button disabled={page===1||page<1} onClick={previusPage}>Previus</button>
        {/* <p> {page} of {max} pages</p> */}
       {arr.map(pag=><button key={pag} onClick={()=>pageCurrent(pag)}>{pag}</button>)} 
      <button disabled={page===max||page>max} onClick={nextPage}>Next</button>
      <div className={s.cards}>
        { gamesPerPage&& gamesPerPage?.map(c=>
        <Card
        key={c.id}
        id={c.id}
        name={c.name}
        image={c.image}
        released={c.released}
        genres={c.genres}
        rating={c.rating}
        />)}
      </div>
      </>
      
    )
  }else{
    return (
      <div >
       <p>Loading...</p>
      </div>
   )
  }
}

