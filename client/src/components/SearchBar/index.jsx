import React, { Component } from 'react'

export default class SearchBar extends Component {
  render() {
    return (
    <>
        <form>
          <input type="text" placeholder="Name of the Game..." />
          <input type="submit" value="Search" />
        </form>
    </>
    )
  }
}
