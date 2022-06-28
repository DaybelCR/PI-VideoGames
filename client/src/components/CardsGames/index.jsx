import React from 'react';

import Card from '../CardGame';
import s from './Cards.module.css';

export default function Cards({gamesPerPage}) {

    if(gamesPerPage.length!==0){
    return (
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
    )
  }else{
    return (
      <div >
       <p>Error en los datos</p>
      </div>
   )
  }
}

