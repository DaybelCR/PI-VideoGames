import React, { useEffect,useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Nav from '../Nav';
import s from './Home.module.css'
import SearchBar from '../SearchBar';
import Cards from '../CardsGames';
import  Select  from '../SelectOptions';
import Pages from '../Pages';
import { getGames } from '../../redux/actions';

export default function Home() {
  const games=useSelector((state)=>state.games);
  const dispatch=useDispatch();

  useEffect(()=>{
    dispatch(getGames());
  },[dispatch])
  
  
  const [page,setPage]=useState(1);
  // eslint-disable-next-line
  const [perPage,setperPage]=useState(15);
  // eslint-disable-next-line
  const[order,setOrder]=useState('');

  const max= Math.ceil(games.length/perPage);
  const gamesPerPage=games.slice((page-1)*perPage,(page-1)*perPage+perPage); //0,15//15,30//30,45...
  
  const previusPage=()=>{setPage(()=>page-1)};
  const nextPage=()=>{setPage(()=>page+1)};
  const pageCurrent=(pag)=>{setPage(()=>pag)};

  return (
    <main className={s.main}>
    <Nav/>
      <Select
      pageCurrent={pageCurrent}
      setOrder={setOrder}
      />
      <SearchBar
       pageCurrent={pageCurrent}
       />
      <Pages
      max={max}
      page={page}
      previusPage={previusPage}
      nextPage={nextPage}
      pageCurrent={pageCurrent}
      />
    <Cards 
    gamesPerPage={gamesPerPage}
    />
    </main>
  );
}
