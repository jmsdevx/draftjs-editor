import React, { Component } from "react";
import axios from "axios";
require("dotenv").config();

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: "",
      type: "regions=us",
      results: [],
      defs: []
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  async handleSubmit(e) {
    e.preventDefault();
    console.log(this.state);
    const { input, type } = this.state;
    await axios
      .post("http://localhost:3005/api/search", {
        input: input,
        type: type
      })
      .then(response =>
        this.setState({ results: response.data }, () =>
          console.log(this.state.results)
        )
      )
      .catch(e => console.log(e));
    this.drill();
  }

  //   drill() {
  //     let defs = this.state.results[0].entries.map((e, i) => {
  //       return e.senses.map((j, k) => {
  //         return j.definitions || j.short_definitions;
  //       });
  //     });
  //     this.setState({ defs: defs }, () => console.log(this.state.defs));
  //   }

  drill() {
    let defs = this.state.results.map((e, i) => {
      return e.entries.map((f, j) => {
        return f.senses.map((g, k) => {
          return g.definitions || g.short_definitions;
        });
      });
    });
    this.setState({ defs: defs }, () => console.log(this.state.defs));
  }
 
  render() {
    return (
      <div className="searchcontainer">
        <h1>Search!</h1>
        <div className="searchformbox">
          <form onSubmit={this.handleSubmit} className="searchForm" />
          <div className="searchbar">
            <label htmlFor="search">Search for a word!</label>
            <input type="text" id="input" onChange={this.handleChange} />
            <select
              name="type"
              id="type"
              defaultValue="regions=us"
              onChange={this.handleChange}
            >
              <option value="regions=us">Dictionary</option>
              <option value="synonyms">Thesaurus</option>
              <option value="sentences">Sentences</option>
              <option value="regions=us;pronunciations">Pronunciation</option>
            </select>
            <button className="submitbtn" onClick={this.handleSubmit}>
              Search
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Search;
