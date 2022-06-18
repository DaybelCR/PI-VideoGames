import React, { Component } from 'react';
import { connect } from 'react-redux';
import Nav from '../Nav';
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
    const {name,rating,released,image,genres,platforms}=this.props.gameDetail;
    return (
        <>
        <Nav/>
        <div >
          <div > 
              <p>Name: {name}</p>
              <p>Rating: {rating}</p>
              <p>Releaded: {released} </p>
              <span>Imagen</span>
              <img src={image} alt='imageDetail' width="450" height="450"/>
              <p>Genres: {genres&&genres?.map((genre,index)=><span key={index} >||{genre}||</span>)}</p>
              <p>Platforms: {platforms&&platforms?.map((platform,index)=><span key={index}>||{platform}||</span>)}</p>
          </div>
      </div>
        </>
     
    )
  }
}

function mapStateToProps(state){
  return {
    gameDetail:state.gameDetail
  }
}

  export default connect(mapStateToProps,{getGameDetail,clearDetail})(Detail)