import React, { Component } from "react";
import "./App.css";
import Nav from "./components/nav/Nav";
import { BrowserRouter } from "react-router-dom";
import routes from "./routes";
// import { Provider } from "react-redux";
// import store from "./ducks/store";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import lightBaseTheme from "material-ui/styles/baseThemes/lightBaseTheme";
import getMuiTheme from "material-ui/styles/getMuiTheme";
// import injectTapEventPlugin from "react-tap-event-plugin";
// injectTapEventPlugin();

class App extends Component {
  render() {
    return (
      // <Provider store={store}>
      <BrowserRouter>
        <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
          <div>
            {/* <Nav /> */}
            {routes}
          </div>
        </MuiThemeProvider>
      </BrowserRouter>
      // </Provider>
    );
  }
}

export default App;
