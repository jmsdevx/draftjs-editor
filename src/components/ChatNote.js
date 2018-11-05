import React, { Component } from "react";
import { EditorState, RichUtils, convertToRaw, convertFromRaw } from "draft-js";
import Editor from "draft-js-plugins-editor";
import createHighlightPlugin from "./plugins/highlightPlugin";
import addLinkPlugin from "./plugins/addLinkPlugin";
import BlockStyleToolbar, {
  getBlockStyle
} from "./blockstyles/BlockStyleToolbar";
import axios from "axios";

const highlightPlugin = createHighlightPlugin();

class ChatNote extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ready: false,
      editorState: EditorState.createEmpty(),
      displayedNote: "new",
      hw_title: "My Chat Note",
      student_id: 2345,
      check: this.props.check
    };

    this.onChange = editorState => this.setState({ editorState });
    this.plugins = [highlightPlugin, addLinkPlugin];
    this.setState = this.setState.bind(this);
  }

  componentDidMount() {
    this.setState({ check: this.props.check });
  }

  createEditor = () => {
    if (this.props.editCheck) {
      this.setState(
        {
          editorState: EditorState.createWithContent(
            convertFromRaw(this.props.note_content)
          ),
          displayedNote: "new",
          hw_title: this.props.note_title,
          student_id: 2345
        },
        () => this.setState({ ready: true }, console.log(this.state))
      );
    } else {
      this.setState({
        editorState: EditorState.createEmpty(),
        displayedNote: "new",
        hw_title: "My Chat Note",
        student_id: 2345
      });
    }
  };

  submitEditor = () => {
    let contentState = this.state.editorState.getCurrentContent();
    let note = { content: convertToRaw(contentState) };
    console.log(note);
    let hw_content = JSON.stringify(note.content);
    console.log("title: " + this.state.hw_title);
    console.log(hw_content);
    const { student_id, hw_title } = this.state;
    this.state.check
      ? axios
          .put(`http://localhost:3005/api/chat/note/${this.state.note_id}`, {
            note_title: hw_title,
            note_content: hw_content
          })
          .then(response => console.log(response))
      : axios
          .post(`http://localhost:3005/api/chat/note`, {
            student_id: student_id,
            note_title: hw_title,
            note_content: hw_content
          })
          .then(response => {
            console.log(response.data[0].max);
            this.setState({ check: true, note_id: response.data[0].max });
          });
  };

  handleKeyCommand = command => {
    const newState = RichUtils.handleKeyCommand(
      this.state.editorState,
      command
    );
    if (newState) {
      this.onChange(newState);
      return "handled";
    }
    return "not-handled";
  };

  onUnderlineClick = () => {
    this.onChange(
      RichUtils.toggleInlineStyle(this.state.editorState, "UNDERLINE")
    );
  };

  onBoldClick = () => {
    this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, "BOLD"));
  };

  onItalicClick = () => {
    this.onChange(
      RichUtils.toggleInlineStyle(this.state.editorState, "ITALIC")
    );
  };

  onHighlight = () => {
    this.onChange(
      RichUtils.toggleInlineStyle(this.state.editorState, "HIGHLIGHT")
    );
  };

  onAddLink = () => {
    const editorState = this.state.editorState;
    const selection = editorState.getSelection();
    const link = window.prompt("Paste the link -");
    if (!link) {
      this.onChange(RichUtils.toggleLink(editorState, selection, null));
      return "handled";
    }
    const content = editorState.getCurrentContent();
    const contentWithEntity = content.createEntity("LINK", "MUTABLE", {
      url: link
    });
    const newEditorState = EditorState.push(
      editorState,
      contentWithEntity,
      "create-entity"
    );
    const entityKey = contentWithEntity.getLastCreatedEntityKey();
    this.onChange(RichUtils.toggleLink(newEditorState, selection, entityKey));
  };

  toggleBlockType = blockType => {
    this.onChange(RichUtils.toggleBlockType(this.state.editorState, blockType));
  };

  titleChange = input => {
    this.setState({ hw_title: input });
    console.log(this.state.hw_title);
  };

  render() {
    return (
      <div>
        {this.props.editCheck ? (
          <div className="editorContainer">
            <input
              type="text"
              value={this.state.hw_title}
              onChange={e => this.titleChange(e.target.value)}
            />
            <div className="btncontainer">
              <button onClick={this.onUnderlineClick}>U</button>
              <button onClick={this.onBoldClick}>
                <b>B</b>
              </button>
              <button onClick={this.onItalicClick}>
                <em>I</em>
              </button>
              <button onClick={this.onHighlight}>
                <span style={{ background: "yellow" }}>H</span>
              </button>
              <button onClick={this.onAddLink}>LINK</button>
            </div>
            <div className="myeditor">
              <BlockStyleToolbar
                editorState={this.state.editorState}
                handleKeyCommand={this.handleKeyCommand}
                onChange={this.onChange}
                onToggle={this.toggleBlockType}
              />
              <Editor
                blockStyleFn={getBlockStyle}
                editorState={this.state.editorState}
                onChange={this.onChange}
                handleKeyCommand={this.handleKeyCOmmand}
                plugins={this.plugins}
              />
            </div>
            <button onClick={this.submitEditor}>Save</button>
          </div>
        ) : (
          <h2>Click New To Start A Chat Note</h2>
        )}
      </div>
    );
  }
}

export default ChatNote;
