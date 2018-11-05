import React, { Component } from "react";
import axios from "axios";

class AllNotes extends Component {
  constructor() {
    super();
    this.state = { notes: [] };
  }

  componentDidMount() {
    this.getAllNotes();
  }

  getAllNotes() {
    axios
      .get(`http://localhost:3005/api/notes/all/${this.props.student_id}`)
      .then(response => this.setState({ notes: response.data }))
      .catch(e => console.log(e));
  }

  deleteNote(id) {
    axios
      .delete(`http://localhost:3005/api/notes/${id}`, {
        student_id: this.props.student_id
      })
      .then(response => {
        this.setState({ notes: response.data });
      })
      .catch(error => console.log(error));
  }

  render() {
    console.log(this.state.notes);
    let display = this.state.notes.map((e, i) => {
      return (
        <div key={i}>
          <h2>
            Title: {e.note_title}
            --- Content: {e.note_content.blocks[0].text} .....{" "}
            {/* redirect left over from homework page*/}
            {/* <Link to={`/notes/edit/${e.note_id}`}>Edit</Link> */}
            {/* <button
              onClick={() =>
                this.props.loadNote(e.note_id, e.note_title, e.note_content)
              }
            >
              Open
            </button> */}
            <button onClick={() => this.deleteNote(e.note_id)}>Delete</button>
          </h2>
        </div>
      );
    });

    return (
      <div>
        <button onClick={() => this.props.loadNote()}>New Note</button>
        <h1>All Notes</h1>
        {display}
      </div>
    );
  }
}

export default AllNotes;
