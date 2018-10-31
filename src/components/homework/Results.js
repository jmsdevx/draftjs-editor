import React, { Component } from "react";
import axios from "axios";
require("dotenv").config();

class Results extends Component {
  constructor() {
    super();
    this.state = { homework: [] };
    this.getHomework = this.getHomework.bind(this);
  }

  componentDidMount() {
    this.getHomework();
  }

  getHomework() {
    axios
      .get(`http://localhost:3005/api/homework/${this.props.match.params.id}`)
      .then(response => this.setState({ homework: response.data }));
  }

  getResults() {
    axios.post();
  }

  render() {
    return (
      <div>
        <h1>Results</h1>
      </div>
    );
  }
}

export default Results;
