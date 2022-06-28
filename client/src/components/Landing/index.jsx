import React from "react";
import { Link } from "react-router-dom";
import s from './Landing.module.css';

export default function Landing(){
return (<div className={s.landing}>
        <div>
        <h1>Videogames App</h1>
        <Link to='/home' className={s.link}>Home</Link>
        </div>
        </div>)
}