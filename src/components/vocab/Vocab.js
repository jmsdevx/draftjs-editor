import React, { Component } from "react";
import Search from "./Search";
import play from "../vocab/Play.jpg";

class Vocab extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <div className="vocabcontainer">
        <img src={play} id="vocab-bg" alt="images" />
        <div>
          <h1>Search</h1>
          <Search />
        </div>
      </div>
    );
  }
}

export default Vocab;
