import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import themeFile from './util/theme'
import jwtDecode from 'jwt-decode'

//Components
import Navbar from "./components/Navbar";
import AuthRoute from './components/AuthRoute';
//pages
import home from "./pages/home";
import login from "./pages/login";
import signup from "./pages/signup";

const theme = createMuiTheme(themeFile);

let authenticated;
const token = localStorage.getItem('FBIdToken')

if(token) {
  const decodedToken = jwtDecode(token);
  if(decodedToken.exp * 1000 < Date.now()) {
    window.location.href = '/login';
    authenticated = false;
  } else {
    authenticated = true;
  }
  
}

class App extends React.Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <div className="App">
          <Router>
            <Navbar />
            <div className="container">
              <Switch>
                <Route path="/" exact component={home} />
                <AuthRoute path="/login"  component={login} authenticated={authenticated}/>
                <AuthRoute path="/signup"  component={signup} authenticated={authenticated}/>
              </Switch>
            </div>
          </Router>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;