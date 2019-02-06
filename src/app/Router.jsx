import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import MainSearch from "./screens/SearchPage/SearchPage.jsx";

class MainRouter extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route path="/" component={MainSearch} />
        </div>
      </Router>
    );
  }
}

export default MainRouter;
