import React from "react";
import { Link } from "react-router-dom";
import s from './Landing.module.css';

export default function Landing(){
return (<div className={s.div}>
        <h1>Daysi Videogames</h1>
        <Link to='/home' className={s.link}>Home</Link>
        </div>)
}