import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Landing from "./screens/LandingPage/landingPage.jsx";
import MainSearch from "./screens/SearchPage/SearchPage.jsx";

class MainRouter extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route exact path="" component={Landing} />
          <Route path="/search" component={MainSearch} />
        </div>
      </Router>
    );
  }
}

export default MainRouter;
