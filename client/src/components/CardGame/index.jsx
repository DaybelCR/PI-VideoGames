import React from 'react';
import { Link } from 'react-router-dom';
import image_not_found from '../../assets/image_not_found.png';
import s from './Card.module.css';

export default function Card({id,name,image,genres,rating}) {
  return (
    <div className={s.card}>
      <h3>{name}</h3>
      <Link to={`/detail/game/${id}`} className={s.link}>Ver más</Link>
      <h4>{rating}</h4>
      <div>
      <img src={image?image:image_not_found} alt="detailImage" width="150" height="150"/>
     </div>
      <div className={s.gnr}>{genres&&genres?.map((g,index)=><h5 key={index}>{g}</h5>)}</div>
    </div>
  )
}
