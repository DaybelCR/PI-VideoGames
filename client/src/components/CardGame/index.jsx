import React from 'react';
import { Link } from 'react-router-dom';

export default function Card({id,name,image,genres}) {
  return (
    <div>
      <Link to={`/detail/game/${id}`}>
       <h3>{name}</h3>
      </Link>
      <img src={image} alt="detailImage" width="50" height="50"/>
      {genres&&genres?.map(g=><h4 key={g.id}>{g.name}</h4>)}
    </div>
  )
}
