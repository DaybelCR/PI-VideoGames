import React, { Component } from "react";
import { connect } from "react-redux";
import Nav from '../Nav';
import {getGenres,createVideogames}  from '../../redux/actions';
import s from './Form.module.css';

const  validate=(obj)=>{
  let errors={};
  if(!obj.form.name) errors.name='Name is required'
  if(!obj.form.released)  errors.released='Date is required';
  if(obj.form.rating==='0') errors.rating='Rating is required';
  if(!obj.form.url) errors.url='Link address is required';
  if(obj.form.genres.length===0) errors.genres='Genre is required';
  if(obj.form.platforms.length===0) errors.platforms='Platform is required';
  if(!obj.form.description) errors.description='Description es required';
  return errors;
}

export class Form extends Component {
  constructor(props){
    super(props);
    this.state={
      form:{
        name:'',
        released:'',
        rating:'0',
        url:'',
        genres:[],
        platforms:[],
        description:'',
      },
      errors:{}
    }
  }

componentDidMount(){
this.props.getGenres();
}
 
  handleInput=(e)=>{
    this.setState({
      form:{
         ...this.state.form,
        [e.target.name]:e.target.value
      },
      errors:validate({
        form:{
          ...this.state.form,
          [e.target.name]:e.target.value
         }
       })
    })
    }
  handleSelect=(e)=>{
   this.setState({
   form:{
     ...this.state.form,
    genres:[...this.state.form.genres,e.target.value],
   } ,
   errors:validate({
    form:{
      ...this.state.form,
      genres:[...this.state.form.genres,e.target.value],
     }
   })
   })
  }
  handleSelect2=(e)=>{
    this.setState({
      form:{
         ...this.state.form,
     platforms:[...this.state.form.platforms,e.target.value],
      },
     errors:validate({
        form:{
           ...this.state.form,
           platforms:[...this.state.form.platforms,e.target.value],
         }
       })
    })
   }

  handleSubmit=(e)=>{
    e.preventDefault();
    const {name,released,rating,url,genres,platforms,description}=this.state.form;
    if(!name||!released||rating==='0'||!url||genres.length===0||platforms.length===0||!description){
      alert('Complete all the fields');
    }else{
      //  this.props.createVideogames(this.state);
       alert('Videogame created!!!');
    //  this.props.history.push('/home');
      console.log(this.state)
    }
  }

    render() {
      const platforms1=["Xbox One","PlayStation 4","Xbox 360","PC","macOs","Linux","Xbox Series S/X","Xbox","PlayStation 5","Nintendo Switch","PlayStation 2","PlayStation 3"];
      return (
        <>
          <Nav/>
          <form className={s.form} onSubmit={(e)=>this.handleSubmit(e)}>
            <h2>VideoGame Creation Form</h2>
            <label>
              Name : <input type="text" name="name" value={this.state.form.name} onChange={(e)=>this.handleInput(e)} />
            </label>
            {this.state.errors.name&&(<p className={s.danger}>{this.state.errors.name}</p>)}
            <label>
              Released :<input type="date" name="released" value={this.state.form.released} onChange={(e)=>this.handleInput(e)}/>
            </label>
            {this.state.errors.released&&(<p className={s.danger}>{this.state.errors.released}</p>)}
            <label>
              Rating :<input type="range" min="0" max="5" name="rating" value={this.state.form.rating} onChange={(e)=>this.handleInput(e)}/>
            </label>
            {this.state.errors.rating&&(<p className={s.danger}>{this.state.errors.rating}</p>)}
            <label>
              Image :<input type="url" name="url" value={this.state.form.url} onChange={(e)=>this.handleInput(e)}/>
            </label>
            {this.state.errors.url&&(<p className={s.danger}>{this.state.errors.url}</p>)}
            <label>Genres:</label>
            <select onChange={(e)=>this.handleSelect(e)}>
              <option value="">***Select***</option>
             {this.props.genres&& this.props.genres?.map(g=>(<option key={g.id} value={g.name}>{g.name}</option>))}
          </select >
          {this.state.errors.genres&&(<p className={s.danger}>{this.state.errors.genres}</p>)}
            <label>Platforms:</label>
            <select name="platforms" onChange={(e)=>this.handleSelect2(e)}>
              <option value="">***Select***</option>
              {platforms1.map((p,index)=>(<option key={index} value={p}>{p}</option>))}
            </select>
            {this.state.errors.platforms&&(<p className={s.danger}>{this.state.errors.platforms}</p>)}
            <label>Description :</label>
            <textarea name='description' value={this.state.form.description} onChange={(e)=>this.handleInput(e)}></textarea>
            {this.state.errors.description&&(<p className={s.danger}>{this.state.errors.description}</p>)}
            <button type="submit" >Send Data</button>
          </form>
        </>
      );
    }
  }

  
function mapStateToProps(state){
  return {
    genres:state.genres
  }
}

export default connect(mapStateToProps,{getGenres,createVideogames})(Form)