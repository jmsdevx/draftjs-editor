import React, { Component } from "react";
import Search from "./Search";
import play from "../../css/Play.mp4";

class Vocab extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <div className="vocabcontainer">
        <video autoPlay loop muted className="video">
          <source src={play} type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        <div className="vocabtitle">
          <h1>Step Up Your</h1>
          <h1 id="vctitle">Vocabulary</h1>
          <h1>Game</h1>

          <Search />
        </div>
      </div>
    );
  }
}

export default Vocab;
