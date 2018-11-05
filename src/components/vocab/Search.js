import React, { Component } from "react";
import axios from "axios";
import Speech from "./Speech";
require("dotenv").config();

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: "",
      type: "regions=us",
      results: [],
      defs: [],
      lexCat: [],
      speech: [[{ audioFile: "none" }]],
      text: "",
      check: false,
      synresults: [],
      synonyms: [],
      synLexCat: [],
      antresults: [],
      antonyms: []
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.speechDisplay = this.speechDisplay.bind(this);
    this.handleThesaurus = this.handleThesaurus.bind(this);
  }

  handleChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  async handleSubmit(e) {
    e.preventDefault();
    const { input, type } = this.state;
    if (type === "regions=us") {
      await axios
        .post("http://localhost:3005/api/search", {
          input: input,
          type: type
        })
        .then(response =>
          this.setState(
            { results: response.data, input: "", check: false },
            () => console.log(this.state.results)
          )
        )
        .catch(e => console.log(e));
      this.drilldefs();
    }
  }

  drilldefs() {
    let defs = this.state.results.map((e, i) => {
      return e.entries.map((f, j) => {
        return f.senses.map((g, k) => {
          return g.definitions || g.short_definitions;
        });
      });
    });
    let lexCat = this.state.results.map((e, i) => {
      return e.lexicalCategory;
    });
    let speech = this.state.results.map((e, i) => {
      return e.pronunciations
        ? e.pronunciations.filter(f => {
            return f.audioFile;
          })
        : this.state.speech;
    });
    let text = this.state.results.map((e, i) => {
      return e.text;
    });
    this.setState(
      {
        defs: defs,
        lexCat: lexCat,
        speech: speech,
        text: text,
        check: !this.state.check
      },
      () => console.log(this.state)
    );
  }

  async handleThesaurus() {
    await axios
      .post("http://localhost:3005/api/search/synonyms", {
        input: this.state.text[0]
      })
      .then(response =>
        this.setState({ synresults: response.data }, () =>
          console.log(this.state.synresults)
        )
      )
      .catch(e => console.log(e));
    this.drillSynonyms();
  }

  drillSynonyms() {
    // let syns = this.state.synresults.map((ele, ind) => {
    //   return ele.entries.map((e, i) => {
    //     return e.senses.map((f, j) => {
    //       return f.subsenses.map((g, h) => {
    //         return g.synonyms.map((element, index) => {
    //           return element.text;
    //         });
    //       });
    //     });
    //   });
    // });
    let synLexCat = this.state.results.map((e, i) => {
      return e.lexicalCategory;
    });
    let syns = this.state.synresults.map((ele, ind) => {
      return ele.entries.map((e, i) => {
        return e.senses.map((f, j) => {
          return f.subsenses
            ? f.subsenses.map((g, k) => {
                return g.synonyms.map((element, index) => {
                  return element.text;
                });
              })
            : f.synonyms;
        });
      });
    });
    this.setState({ synonyms: syns, synLexCat: synLexCat }, () =>
      console.log(this.state.synonyms)
    );
  }

  speechDisplay() {
    console.log(this.state.speech[0][0].audioFile);
    return <Speech speech={this.state.speech[0][0].audioFile} />;
  }

  render() {
    let lexCatDisplay = this.state.lexCat.map((e, i) => {
      return (
        <div className="lexCat" key={i}>
          <h1>{e}</h1>
        </div>
      );
    });

    let defsDisplay = this.state.defs.map((e, i) => {
      return e.map((f, j) => {
        return f.map((g, k) => {
          return (
            <div className="defs" key={k}>
              <h3>
                {k + 1}. {g}
              </h3>
            </div>
          );
        });
      });
    });

    return (
      <div className="searchcontainer">
        <h1>Search!</h1>
        <div className="searchformbox">
          <form onSubmit={this.handleSubmit} className="searchForm" />
          <div className="searchbar">
            <label htmlFor="search">Search for a word!</label>
            <input type="text" id="input" onChange={this.handleChange} />
            <select
              name="type"
              id="type"
              defaultValue="regions=us"
              onChange={this.handleChange}
            >
              <option value="regions=us">Dictionary</option>
              <option value="synonyms">Synonyms</option>
              <option value="antonyms">Antonyms</option>
              <option value="sentences">Sentences</option>
            </select>
            <button className="submitbtn" onClick={this.handleSubmit}>
              Search
            </button>
          </div>
        </div>
        <div className="searchResults">
          <div>{lexCatDisplay}</div>
          <div>{defsDisplay}</div>
          {this.state.check ? (
            <Speech speech={this.state.speech[0][0].audioFile} />
          ) : null}
          {/* <button onClick={() => this.speechDisplay()}>Get Speech</button> */}
        </div>
        <button onClick={this.handleThesaurus}>Thesaurus</button>
      </div>
    );
  }
}

export default Search;
