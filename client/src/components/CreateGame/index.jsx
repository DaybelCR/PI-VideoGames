import React, { Component } from "react";
import Nav from '../Nav';
import s from './Form.module.css';


export default class Form extends Component {

    render() {
      return (
        <>
          <Nav/>
          <form className={s.form}>
            <h2>VideoGame Creation Form</h2>
            <label>
              Name : <input type="text" />
            </label>
            <label>
              Released :<input type="date" />
            </label>
            <label>
              Rating :<input type="range" min="0" max="5" />
            </label>
            <label>
              Image :<input type="url" />
            </label>
            <label>Genres:</label>
            <select name="name" id="name" multiple>
              <option value="all">All</option>
            </select>
            <label>Platforms:</label>
            <select name="name" id="name" multiple>
              <option value="all">All</option>
            </select>
            <label>
              Description :<textArea ></textArea>
            </label>
            <button type="submit">Send Data</button>
          </form>
        </>
      );
    }
  }
