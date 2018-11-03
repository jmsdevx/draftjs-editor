import React, { Component } from "react";
import Search from "./Search";

class Vocab extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <div className="vocabcontainer">
        <h1>My Vocabulary</h1>
        <Search />
      </div>
    );
  }
}

export default Vocab;
