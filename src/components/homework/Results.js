import React, { Component } from "react";
import axios from "axios";
require("dotenv").config();

class Results extends Component {
  constructor() {
    super();
    this.state = {
      homework: [],
      content: "",
      errors: {
        errors: [
          { bad: "click get to see results" },
          { type: "" },
          { better: ["none"] }
        ]
      },
      check: false
    };
    this.getHomework = this.getHomework.bind(this);
    this.drill = this.drill.bind(this);
    this.getResults = this.getResults.bind(this);
  }

  componentDidMount() {
    this.getHomework();
  }

  async getHomework() {
    await axios
      .get(`http://localhost:3005/api/homework/${this.props.match.params.id}`)
      .then(response =>
        this.setState({ homework: response.data, check: false })
      );
    this.drill();
  }

  drill() {
    let alltext = this.state.homework[0].hw_content.blocks.map((e, i) =>
      alltext.push(e.text)
    );
    let newtext = alltext.join(" ");
    this.setState({ content: newtext, check: !this.state.check });
    console.log(this.state.content);
  }

  getResults() {
    axios
      .post(
        `https://api.textgears.com/check.php?text=${
          this.state.content
        }?&key=HzehDNgOrWUNFEOk`
      )
      .then(response => this.setState({ errors: response.data }));
  }

  highlight() {
    let split = this.state.content.split();
  }

  render() {
    let errordisplay = "";
    let typedisplay = "";
    let fixdisplay = "";
    if (this.state.check) {
      errordisplay = this.state.errors.errors.map((e, i) => {
        return (
          <div key={i}>
            <h3>{e.bad}</h3>
          </div>
        );
      });
      typedisplay = this.state.errors.errors.map((e, i) => {
        return (
          <div key={i}>
            <h3>{e.type}</h3>
          </div>
        );
      });
      fixdisplay = this.state.errors.errors.map((e, i) => {
        return (
          <div key={i}>
            <h3>{e.better}</h3>
          </div>
        );
      });
    }

    return (
      <div className="resultsContainer">
        <h1>Results</h1>
        <button onClick={this.getResults}>Get</button>
        <div className="hwErrorBox">
          <div className="yourHomework">
            <h2>Your Homework: </h2>
            <h3>{this.state.content}</h3>
          </div>
          <div className="errors">
            <div>
              <h2>Errors:</h2>
              {errordisplay}
            </div>
            <div>
              <h2>Type:</h2>
              {typedisplay}
            </div>
            <div>
              <h2>Suggestion:</h2>
              {fixdisplay}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Results;
