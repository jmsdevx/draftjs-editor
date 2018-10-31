import React, { Component } from "react";
import axios from "axios";

class SignUp extends Component {
  constructor() {
    super();
    this.state = {
      student_id: "",
      f_name: "",
      l_name: "",
      email: "",
      nation: "",
      f_language: "",
      age: "",
      gender: ""
    };
  }

  handleChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };
  handleSubmit = e => {
    e.preventDefault();
    console.log(this.state);
    const {
      student_id,
      f_name,
      l_name,
      email,
      nation,
      f_language,
      age,
      gender
    } = this.state;
    axios
      .post("http://localhost:3005/api/students", {
        student_id: student_id,
        f_name: f_name,
        l_name: l_name,
        email: email,
        nation: nation,
        f_language: f_language,
        age: age,
        gender: gender
      })
      .then(
        this.setState({
          student_id: "",
          f_name: "",
          l_name: "",
          email: "",
          nation: "",
          f_language: "",
          age: "",
          gender: ""
        })
      );
  };

  render() {
    return (
      <div className="container">
        <form onSubmit={this.handleSubmit} className="signupform" />
        <h3 className="signuptitle">Sign Up</h3>
        <div className="input-field">
          <label htmlFor="studentid">Student ID</label>
          <input type="number" id="student_id" onChange={this.handleChange} />
        </div>
        <div className="input-field">
          <label htmlFor="firstName">First Name</label>
          <input type="text" id="f_name" onChange={this.handleChange} />
        </div>
        <div className="input-field">
          <label htmlFor="lastName">Last Name</label>
          <input type="text" id="l_name" onChange={this.handleChange} />
        </div>
        <div className="input-field">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" onChange={this.handleChange} />
        </div>
        <div className="input-field">
          <label htmlFor="country">Home Nation</label>
          <input type="text" id="nation" onChange={this.handleChange} />
        </div>
        <div className="input-field">
          <label htmlFor="firstlanguage">First Language</label>
          <input type="text" id="f_language" onChange={this.handleChange} />
        </div>
        <div className="input-field">
          <label htmlFor="age">Age</label>
          <input type="number" id="age" onChange={this.handleChange} />
        </div>
        <fieldset>
          <legend>Gender</legend>
          <div>
            <label htmlFor="M">M</label>
            <input
              type="radio"
              id="gender"
              value="M"
              name="gender"
              onChange={this.handleChange}
            />
          </div>
          <div>
            <label htmlFor="F">F</label>
            <input
              type="radio"
              id="gender"
              name="gender"
              value="F"
              onChange={this.handleChange}
            />
          </div>
        </fieldset>
        <div className="input-field">
          <button className="submitbtn" onClick={this.handleSubmit}>
            Submit
          </button>
        </div>
      </div>
    );
  }
}

export default SignUp;
