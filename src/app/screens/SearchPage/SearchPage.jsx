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

// helpers

import { sortData, commonSorted } from "../../utils/scrapers/sorting";

import spinner from "./spinner.gif";

class MainSearch extends Component {
  constructor(props) {
    super(props);
    this.state = { tags: {}, count: 0, time: 20 };
  }

  componentDidMount() {
    const { actions } = this.props;
    actions.getSearchData();
  }

  async searchAll() {
    const { data, actions } = this.props;
    const sorted = sortData(data);
    console.log(sorted);
    actions.fetchDatas(sorted[this.state.count]);
  }

  filterHashtags() {
    const { data } = this.props;
    const sorted = commonSorted(data);
    // redux edits
    return sorted.map((item, index) => {
      if (data.length > 0 && item.length === 30) {
        return (
          <div key={index} className="result">
            <h3>Most Used</h3>
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

  filterHashtags2() {
    const { data } = this.props;
    const sorted = sortData(data);
    return sorted.map((item, index) => {
      if (data.length > 0) {
        return (
          <div key={index} className="result">
            <h3>Popular</h3>
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

  leveler(postNumber) {
    if (postNumber <= 50000) {
      return "Not Competative";
    } else if (postNumber <= 150000 && postNumber > 50000) {
      return "Slightly Competative";
    } else if (postNumber <= 1500000 && postNumber > 150000) {
      return "Competative";
    } else if (postNumber <= 5000000 && postNumber > 1500000) {
      return "Very Competative";
    } else {
      return "Extremely Competative";
    }
  }

  competativeLevel() {
    const { data } = this.props;
    const re1 = '("edge_hashtag_to_media")'; // Double Quote String 1
    const re2 = "(.)"; // Any Single Character 1
    const re3 = "(.)"; // Any Single Character 2
    const re4 = '(".*?")'; // Double Quote String 2
    const re5 = "(.)"; // Any Single Character 3
    const re6 = "(\\d+)"; // Integer Number 1
    let p = new RegExp(re1 + re2 + re3 + re4 + re5 + re6, ["i"]);
    const string = data.match(p);
    const competation = string
      ? string[0].replace(`"edge_hashtag_to_media":{"count":`, "")
      : 0;

    return competation === 0 ? null : (
      <div className="result">
        <h3>Posts: {competation}</h3>
        <h4>{this.leveler(Number(competation))}</h4>
      </div>
    );
  }

  spinner() {
    return <img className="spinner" src={spinner} alt="loading..." />;
  }

  handleSearch(tag) {
    const { actions } = this.props;
    actions.fetchData(tag);
    // let send = { hashtag: tag };
    // axios
    //   .post(
    //     "https://4mf0vxmyn1.execute-api.us-east-2.amazonaws.com/dev/test-api",
    //     send
    //   )
    //   .catch(e => alert(e));
  }

  getSearchedTags() {
    const { hashtagsData } = this.props;
    const count = hashtagsData.reduce((hashtag, amount) => {
      hashtag[amount] = (hashtag[amount] || 0) + 1;
      return hashtag;
    }, {});
    return Object.entries(count).map(([key, value]) =>
      value >= 5 ? <li key={key}>#{key}</li> : null
    );
  }

  findLessCompetative() {
    const { pagesAll, competeTags } = this.props;
    const re1 = '("edge_hashtag_to_media")'; // Double Quote String 1
    const re2 = "(.)"; // Any Single Character 1
    const re3 = "(.)"; // Any Single Character 2
    const re4 = '(".*?")'; // Double Quote String 2
    const re5 = "(.)"; // Any Single Character 3
    const re6 = "(\\d+)"; // Integer Number 1
    let p = new RegExp(re1 + re2 + re3 + re4 + re5 + re6, ["g"]);
    const string = pagesAll.map(item => item.data.match(p));
    const competation = string
      ? string.map(item =>
          item[0].replace(`"edge_hashtag_to_media":{"count":`, "")
        )
      : 0;
    let result = Object.assign(
      ...competeTags.map((k, i) => ({ [k]: competation[i] }))
    );
    let newObj = Object.assign(
      ...Object.entries(result).map(([k, v]) => (v >= 350000 ? {} : { [v]: k }))
    );
    // add spread operator to update instead of overwrite tags: {...this.state.tags, ...newObj}
    return this.setState({ tags: newObj });
  }

  async vudu() {
    this.setState({ count: this.state.count + 1 })
    this.searchAll()
  }

  renderLessCompetative() {
    // Object.entries(this.state.tags).map(([key, value]) => value); returns an array
    let custarr = [];
    Object.entries(this.state.tags).map(([key, value]) => custarr.push(value));
    console.log("cust arr", custarr);
    const sorted = _.chunk(custarr, 30).map(item => {
      return item;
    });
    return sorted.map((item, index) =>
      custarr.length > 0 ? (
        <div key={index} className="result">
          <h3>Best</h3>
          <p>{item}</p>
          <button className="copy" onClick={() => this.vudu()}>
            Add to Builder
          </button>
        </div>
      ) : null
    );
  }

  render() {
    const { actions, word, isFecthing, pagesAll } = this.props;
    console.log("helele", this.state.customtags);
    console.log("zlatan", pagesAll);
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
          <button type="button" onClick={() => this.searchAll()}>
            try me
          </button>
          <button type="button" onClick={() => this.findLessCompetative()}>
            filter
          </button>
          <h1 className="landing-content">Hashtogram</h1>
          <p className="landing-content">
            ( Find better hashtags for your Instagram )
          </p>
          <div className="hashtag-data">
            <ul>
              <li className="hashtag-data-title">Top Tags:</li>
              {this.getSearchedTags()}
            </ul>
          </div>
          <div className="update-info">
            <p>
              <b>Update:</b> There are two types of hashtag sets,{" "}
              <b>Popular & Most Used</b>
            </p>
          </div>
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
        {this.renderLessCompetative()}
        {isFecthing ? null : this.competativeLevel()}
        {isFecthing ? null : this.filterHashtags2()}
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
    pagesAll: state.data.pagesAll,
    isFecthing: state.data.isFecthing,
    competeTags: state.data.competeTags,
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
