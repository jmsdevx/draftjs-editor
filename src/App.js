import React, { Component } from "react";
import "./App.css";
import Nav from "./components/nav/Nav";
import { BrowserRouter } from "react-router-dom";
import routes from "./routes";
// import { Provider } from "react-redux";
// import store from "./ducks/store";

class App extends Component {
  render() {
    return (
      // <Provider store={store}>
      <BrowserRouter>
        <div>
          <Nav />
          {routes}
        </div>
      </BrowserRouter>
      // </Provider>
    );
  }
}

export default App;
