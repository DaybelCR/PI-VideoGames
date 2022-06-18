import React from 'react';

import Nav from '../Nav';
import SearchBar from '../SearchBar';
import Cards from '../CardsGames';
import  Select  from '../SelectOptions';

export default function Home() {

  return (
    <>
    <Nav/>
      <Select/>
      <SearchBar/>
    <Cards/>
    </>
  );
}
