import React, { useState} from 'react';
import { useDispatch } from 'react-redux';
import {Link} from 'react-router-dom';

import {onSearchGameName}  from '../../redux/actions';
import AddButton from '../../assets/add.png';
import s from './SearchBar.module.css';

export default function SearchBar({pageCurrent}) {
  const dispatch=useDispatch();
  const[input,setInput]=useState('');
 function handleSubmit(e){
    e.preventDefault();
    if(input){
      dispatch(onSearchGameName(input));
      setInput('');
      pageCurrent(1);
    }else{
      return alert('Write a name to search...')
    } 
 }
  function handleChange(e){
    setInput(e.target.value);
  }
  
    return (
        <div className={s.box}>
          <form onSubmit={(e)=>handleSubmit(e)}>
              <input type="text" placeholder="Name of the Game..." value={input} onChange={(e)=>handleChange(e)}/>
              <input type="submit" value="Search" />
          </form>
          <Link to="/create/game" className={s.link}><img src={AddButton} width="35" height="35" alt="logo-create"/><span>Create Game</span></Link>
        </div> 
    )
}
