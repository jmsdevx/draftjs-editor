import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

class AllHomework extends Component {
  constructor() {
    super();
    this.state = { homeworks: [] };
  }

  componentDidMount() {
    this.getAllHomework();
  }

  getAllHomework() {
    axios
      .get("http://localhost:3005/api/homework/all")
      .then(response => this.setState({ homeworks: response.data }))
      .catch(e => console.log(e));
  }

  render() {
    let display = this.state.homeworks.map((e, i) => {
      return (
        <div key={i}>
          <h2>
            Title: {e.hw_title}
            --- Content: {e.hw_content.blocks[0].text} .....{" "}
            <Link to={`/homework/results/${e.hw_id}`}>Results</Link>
          </h2>
        </div>
      );
    });

    return (
      <div>
        <h1>All Homework</h1>
        {display}
      </div>
    );
  }
}

export default AllHomework;
