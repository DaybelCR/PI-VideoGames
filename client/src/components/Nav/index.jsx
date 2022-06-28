import React from 'react';
import {Link} from 'react-router-dom';
import Logo from '../../assets/logo.png';
import Home from '../../assets/home.png';
import s from './Nav.module.css';

export default function NavBar() {
  return (
    <nav className={s.nav}>
        <ul>
            <li>
                <Link to='/' className={s.link}> <img src={Logo} width="25" height="25" alt="logo-videoGames"  /> 
                Videogames</Link>
            </li>
            <li>
                <Link to="/home" className={s.link}> <img src={Home} width="35" height="25" alt="logo-home"  /> Home</Link>
            </li>
        </ul>
  </nav>
  )
}
