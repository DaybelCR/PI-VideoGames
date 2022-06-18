import React, { useState} from 'react';
import { useDispatch } from 'react-redux';
import {onSearchGameName}  from '../../redux/actions';

export default function SearchBar() {
  const dispatch=useDispatch();
  const[input,setInput]=useState('');
  // const vgt=useSelector(state=>state);
 function handleSubmit(e){
    e.preventDefault();
    if(input){
      dispatch(onSearchGameName(input));
      setInput('');
    }else{
      return alert('Write a name to search...')
    } 
 }
  function handleChange(e){
    setInput(e.target.value);
  }
  
    return (
        <form onSubmit={(e)=>handleSubmit(e)}>
          <input type="text" placeholder="Name of the Game..." value={input} onChange={(e)=>handleChange(e)}/>
          <input type="submit" value="Search" />
        </form>
    )
  
}
