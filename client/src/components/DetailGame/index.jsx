import React, { Component } from 'react';
import { connect } from 'react-redux';
import Nav from '../Nav';
import s from './Detail.module.css';
import image_not_found from '../../assets/image_not_found.png';
import {getGameDetail,clearDetail}  from '../../redux/actions';

export  class Detail extends Component {
  
  componentDidMount(){
    const id=this.props.match.params.id;
   this.props.getGameDetail(id);
  }
  componentWillUnmount(){
    this.props.clearDetail();
  }
  render() {
    const {name,rating,released,image,genres,description,platforms}=this.props.gameDetail;
    if(Object.keys(this.props.gameDetail).length!==0){
      return (
        <div className={s.detail}>
        <Nav/>
          <div > 
              <p>Name: <span>{name}</span></p>
              <p>Rating: <span>{rating}</span></p>
              <p>Released: <span>{released}</span></p>
              <img src={image?image:image_not_found} alt='imageDetail' width="450" height="450"/>
              <p>Genres: {genres&&genres?.map((genre,index)=><span key={index}>{genre}</span>)}</p>
              <p>Platforms: {platforms&&platforms?.map((platform,index)=><span key={index} >{platform}</span>)}</p>
              <p>Description:</p>
              <p className={s.description}>{description}</p>
          </div>
        </div> 
    )
    }else{
      return(
        <div className={s.page}>
        <Nav/>
        <div>
        <img src='https://c.tenor.com/HyeEj-aHooMAAAAC/fightoons-loading.gif'alt='loading'
         width="400" height="300"/>
        </div>
        </div>
        
      )
    }
   
  }
}

function mapStateToProps(state){
  return {
    gameDetail:state.gameDetail
  }
}

  export default connect(mapStateToProps,{getGameDetail,clearDetail})(Detail)