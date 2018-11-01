import React, { Component } from "react";
import { EditorState, RichUtils, convertFromRaw, convertToRaw } from "draft-js";
import Editor from "draft-js-plugins-editor";
import createHighlightPlugin from "../plugins/highlightPlugin";
import addLinkPlugin from "../plugins/addLinkPlugin";
import BlockStyleToolbar, {
  getBlockStyle
} from "../blockstyles/BlockStyleToolbar";
import axios from "axios";
// import { connect } from "react-redux";

const highlightPlugin = createHighlightPlugin();

class Edit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //   editorState: EditorState.createEmpty(),
      editorState: EditorState.createWithContent(
        convertFromRaw(this.props.location.state[0].hw_content)
      ),
      displayedNote: "new",
      hw_title: this.props.location.state[0].hw_title,
      homework: []
    };
    this.onChange = editorState => this.setState({ editorState });
    this.plugins = [highlightPlugin, addLinkPlugin];
  }

  //   componentDidMount() {
  //     this.getHomework();
  //   }

  //   async getHomework() {
  //     await axios
  //       .get(`http://localhost:3005/api/homework/${this.props.match.params.id}`)
  //       .then(response => {
  //         this.setState({ homework: response.data, check: false });
  //         console.log(this.state.homework);
  //       });
  //   }

  // componentDidMount() {
  //   if (this.props.note === null) {
  //     this.setState({
  //       displayedNote: "new",
  //       editorState: EditorState.createEmpty()
  //     });
  //   } else {
  //     this.setState({
  //       displayedNote: this.props.note.id,
  //       editorState: EditorState.createWithContent(
  //         convertFromRaw(JSON.parse(this.props.note.content))
  //       )
  //     });
  //   }
  // }

  // componentDidUpdate(prevProps, prevState) {
  //   if (prevProps.note == null && !!this.props.note) {
  //     this.props.loadNote();
  //     this.setState({
  //       displayedNote: this.props.note.id,
  //       editorState: EditorState.createWithContent(
  //         convertFromRaw(JSON.parse(this.props.note.content))
  //       )
  //     });
  //   }
  // }

  // submitEditor = () => {
  //   let contentState = this.state.editorState.getCurrentContent();
  //   if (this.state.displayedNote === "new") {
  //     let note = { content: convertToRaw(contentState) };
  //     note["content"] = JSON.stringify(note.content);
  //     this.props.createNote(note.content);
  //   } else {
  //     let note = { content: convertToRaw(contentState) };
  //     note["content"] = JSON.stringify(note.content);
  //     this.props.updateNote(this.state.displayedNote, note.content);
  //   }
  // };

  submitEditor = () => {
    let contentState = this.state.editorState.getCurrentContent();
    console.log(contentState);
    let note = { content: convertToRaw(contentState) };
    let hw_content = JSON.stringify(note.content);
    console.log("title: " + this.state.hw_title);
    console.log(hw_content);
    const { hw_title } = this.state;
    axios.put(
      `http://localhost:3005/api/homework/edit/${this.props.match.params.id}`,
      {
        hw_title: hw_title,
        hw_content: hw_content
      }
    );
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
        <button onClick={this.submitEditor}>Submit</button>
      </div>
    );
  }
}

// function mapStatetoProps(state) {
//   return { state };
// }

// export default connect(mapStatetoProps)(PageContainer);

export default Edit;
