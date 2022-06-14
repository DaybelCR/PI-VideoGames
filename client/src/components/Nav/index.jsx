import React from 'react';
import {Link} from 'react-router-dom';
import Logo from '../../assets/logo.png';

export default function NavBar() {
  return (
    <nav>
        <ul>
            <li>
                <Link to='/'> <img src={Logo} width="20" height="20" alt="logo-videoGames" /> 
                Videogames</Link>
                </li>
            <li>
                <Link to="/home">Home</Link>
            </li>
        </ul>
  </nav>
  )
}
