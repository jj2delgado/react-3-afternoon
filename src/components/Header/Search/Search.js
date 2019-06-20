import React, { Component } from 'react';

import './Search.css';

import SearchIcon from 'react-icons/lib/md/search';

//////////////////////////////////////////////////////// THIS COMPONENT IS BEING RENDERED IN THE *HEADER* COMPONENT

export default class Search extends Component {
  constructor(props){
    super(props)

    this.state = {
      currentInput: ''
    }
  }

  handleInput(input){
    this.setState({currentInput: input})
  }

  render() {
    return (
      <section className="Search__parent">

        <div className="Search__content">
          <input placeholder="Search Your Feed" onChange={(e) => this.handleInput(e.target.value)}/>

          <SearchIcon id="Search__icon" onClick={ () => {
            console.log(this.state.currentInput)
            this.props.searchPosts(this.state.currentInput)}}/>
        </div>
        
      </section>
    )
  }
}