import React  from 'react';
import s from './Pages.module.css';

export default function Pages({max,page,previusPage,pageCurrent,nextPage}) {
  
    let arr=[];
     for(let i=1;i<=max;i++){
        arr.push(i)
      }

  return (
    <div className={s.pages}>
       <button disabled={page===1||page<1} onClick={previusPage}>Previus</button>
       {arr.map(pag=><button key={pag} onClick={()=>pageCurrent(pag)}>{pag}</button>)} 
      <button disabled={page===max||page>max} onClick={nextPage}>Next</button>
    </div>
  )
}
