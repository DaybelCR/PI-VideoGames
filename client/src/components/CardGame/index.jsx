import React from 'react';
import { Link } from 'react-router-dom';
import s from './Card.module.css';

export default function Card({id,name,image,genres,rating}) {
  return (
    <div className={s.card}>
      <Link to={`/detail/game/${id}`}>
       <h3>{name}</h3>
      </Link>
      <h4>{rating}</h4>
      <img src={image} alt="detailImage" width="150" height="150"/>
      {genres&&genres?.map(g=><h4 key={g.id}>{g.name}</h4>)}
    </div>
  )
}
