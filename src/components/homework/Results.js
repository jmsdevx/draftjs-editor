import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
require("dotenv").config();

class Results extends Component {
  constructor() {
    super();
    this.state = {
      homework: [],
      content: "",
      errors: {
        errors: [{ bad: "Loading!" }, { type: "" }, { better: [""] }]
      },
      suggestion: "",
      highlights: [],
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
    let alltext = this.state.homework[0].hw_content.blocks.map(
      (e, i) => e.text
    );
    let newtext = alltext.join(" ");
    this.setState({ content: newtext, check: !this.state.check }, () =>
      this.getResults()
    );
  }

  getResults() {
    axios
      .post(
        `https://api.textgears.com/check.php?text=${this.state.content}?&key=${
          process.env.TG_KEY
        }`
      )
      .then(
        response => this.setState({ errors: response.data })
        // , () => this.highlight())
      );
  }

  render() {
    let errordisplay = "";
    let typedisplay = "";
    let fixdisplay = "";
    let contentdisplay = this.state.content;

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
            <h3>{e.better && e.better[0]}</h3>
          </div>
        );
      });
    }

    return (
      <div className="resultsContainer">
        <h1>Results</h1>
        <div className="hwErrorBox">
          <div className="yourHomework">
            <h2>Your Homework: </h2>
            <h3>{contentdisplay}</h3>
            <Link
              to={{
                pathname: `/homework/edit/${this.props.match.params.id}`,
                state: this.state.homework
              }}
            >
              Edit
            </Link>
          </div>
          <div className="errors">
            <div>
              <h2>Errors:</h2>
              {errordisplay}
            </div>
            <div>
              <h2>Suggestion:</h2>
              {fixdisplay}
            </div>
            <div>
              <h2>Type:</h2>
              {typedisplay}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Results;

//possible future use for color coding
// highlight() {
//   let { errors } = this.state.errors;
//   let { content } = this.state;
//   for (let i = 0; i < errors.length; i++) {
//     let start = errors[i].offset;
//     let length = errors[i].length;
//     let newcontent =
//       content.substring(0, start) +
//       content
//         .substring(start, start + length)
//         .bold()
//         .fontcolor("red") +
//       content.substring(start + length + 1, content.length);
//     this.setState({ content: newcontent });
//   }
// }

//possible future use for color coding
// highlight() {
//   let { errors } = this.state.errors;
//   let highlights = errors.map((e, i) => {
//     return { offset: e.offset, length: e.length };
//   });
//   this.setState({ highlights: highlights });
// }
