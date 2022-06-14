import React from 'react';
import { connect } from 'react-redux';
import Card from '../CardGame'
import {getGames}  from '../../redux/actions';

export class Cards extends React.Component {
  componentDidMount(){
  this.props.getGames();
  }
  render() {
    return (
      <div>
        {this.props.games&& this.props.games?.map(c=>
        <Card
        key={c.id}
        id={c.id}
        name={c.name}
        image={c.image}
        released={c.released}
        genres={c.genres}
        />)}
      </div>
    )
  }
}


function mapStateToProps(state){
  return {
    games:state.games
  }
  }
function mapDispatchToProps(dispatch){
  return{
    getGames:()=>dispatch(getGames())
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Cards)