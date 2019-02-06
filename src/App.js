import React, { Component } from "react";
import MainRouter from "./app/Router.jsx";
import { createStore, applyMiddleware } from "redux";
import ReduxThunk from "redux-thunk";
import reducers from "./app/utils/reducers";
import { Helmet } from "react-helmet";
import { Provider } from "react-redux";

const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Helmet>
          <meta
            name="description"
            content="Instagram related and best hashtag finder"
          />
          <meta
            name="keywords"
            content="instagram,content,createors,likes,followers,hashtag,besthashtag,getinstagramlikes,getinstagrafollowers,groworganically,organiclikes,organicfollowers"
          />
          <meta name="author" content="Naim Mustafa" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
        </Helmet>
        <MainRouter />
      </Provider>
    );
  }
}

export default App;
