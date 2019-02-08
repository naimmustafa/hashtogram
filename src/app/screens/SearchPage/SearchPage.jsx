import React, { Component } from "react";
import { FaSistrix } from "react-icons/fa";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actions from "../../utils/actions";
import { CopyToClipboard } from "react-copy-to-clipboard";
import _ from "lodash";
import { Helmet } from "react-helmet";
import axios from "axios";
import "./mainSearch.css";

import spinner from "./spinner.gif";

class MainSearch extends Component {
  componentDidMount() {
    const { actions } = this.props;
    actions.getSearchData();
  }

  filterHashtags() {
    const { data } = this.props;
    const re = new RegExp("(?:^|[ ])#([a-zA-Z0-9]+)", "g");
    const match = data.match(re);
    const dups =
      match === null ? null : match.filter((v, i, a) => a.indexOf(v) < i);
    const unique = [...new Set(dups)];
    const sorted = _.chunk(unique, 30).map(item => {
      return item;
    });
    // redux edits
    return sorted.map((item, index) => {
      if (data.length > 0 && item.length === 30) {
        return (
          <div key={index} className="result">
            <p>{item}</p>
            <CopyToClipboard text={item.join().replace(/[ ]*,[ ]*|[ ]+/g, " ")}>
              <button className="copy">Copy Tags</button>
            </CopyToClipboard>
          </div>
        );
      } else {
        return null;
      }
    });
  }

  filterImages() {
    const { data } = this.props;
    const width = window.innerWidth;
    const re = new RegExp(
      "(http(s?):)([/_=?|.|\\w||\\s|-])*\\640x640([/_=?|.|\\w||\\s|-])*\\.(?:jpg|gif|png)([/_=?|.|\\w||\\s|-])*\\.(?:com)",
      "g"
    );
    if (data.length > 0) {
      const links = data.match(re);
      const unique = [...new Set(links)];
      return unique.map((image, index) => (
        <a href={image} key={index} target={image}>
          <img
            className="instagram-images"
            style={
              width < 600
                ? {
                    width: 50,
                    height: 50,
                    marginLeft: 5,
                    marginRight: 5,
                    marginBottom: 5
                  }
                : { width: 150, height: 150 }
            }
            src={image}
            alt=""
          />
        </a>
      ));
    }
    return null;
  }

  spinner() {
    return <img className="spinner" src={spinner} alt="loading..." />;
  }

  handleSearch(tag) {
    const { actions } = this.props;
    actions.fetchData(tag);
    let send = { hashtag: tag };
    axios
      .post(
        "https://4mf0vxmyn1.execute-api.us-east-2.amazonaws.com/dev/test-api",
        send
      )
      .catch(e => alert(e));
  }

  getSearchedTags() {
    const { hashtagsData } = this.props;
    const count = hashtagsData.reduce((tally, fruit) => {
      tally[fruit] = (tally[fruit] || 0) + 1;
      return tally;
    }, {});
    return Object.entries(count).map(([key, value]) =>
      value >= 5 ? (
        <li key={key}>
          #{key}: {value}
        </li>
      ) : null
    );
  }

  render() {
    const { actions, word, isFecthing } = this.props;
    return (
      <div className="search-bar-container">
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
        <div className="page-header">
          <h1 className="landing-content">Hashtogram</h1>
          <p className="landing-content">
            ( Find better hashtags for your Instagram )
          </p>
        </div>
        <div className="hashtag-data">
          <ul>
            <li className="hashtag-data-title">Top Tags:</li>
            {this.getSearchedTags()}
          </ul>
        </div>
        <div className="example">
          <input
            type="text"
            placeholder="Search.."
            name="search"
            onChange={event => actions.searchWord(event.target.value)}
          />
          <button
            type="button"
            onClick={
              word.length > 0
                ? () => this.handleSearch(word)
                : () => alert("type something")
            }
          >
            <FaSistrix />
          </button>
        </div>
        {isFecthing ? this.spinner() : this.filterHashtags()}
        <div className="result">{isFecthing ? null : this.filterImages()}</div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    data: state.data.data,
    word: state.data.word,
    hashtag: state.data.tag,
    isFecthing: state.data.isFecthing,
    hashtagsData: state.hashtags.hashtagsData
  };
};

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainSearch);
