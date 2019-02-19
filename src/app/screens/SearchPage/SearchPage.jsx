import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actions from "../../utils/actions";
import "./mainSearch.css";

// npm imports
import { CopyToClipboard } from "react-copy-to-clipboard";
import { Helmet } from "react-helmet";
import _ from "lodash";

// helpers
import {
  sortData,
  commonSorted,
  leveler,
  findLessCompetativeSort
} from "../../utils/scrapers/sorting";
import { competativeScraper } from "../../utils/scrapers/hashtagArray";

// assest
import spinner from "./spinner.gif";
import { FaSistrix } from "react-icons/fa";

// Component
class MainSearch extends Component {
  constructor(props) {
    super(props);
    this.state = { tags: {}, count: 0, time: 20 };
  }

  componentDidMount() {
    const { actions } = this.props;
    actions.getSearchData();
  }

// functions

  handleSearch(tag) {
    const { actions } = this.props;
    actions.fetchData(tag);
    // actions.sendSearchData(tag);
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

  searchAll() {
    const { data, actions } = this.props;
    const sorted = sortData(data);
    if (data.length > 0) {
      actions.fetchDatas(sorted[this.state.count]);
    }
    return null;
  }

  findLessCompetative() {
    const { pagesAll, competeTags } = this.props;
    const newObj = findLessCompetativeSort(pagesAll, competeTags);
    return this.setState({ tags: { ...this.state.tags, ...newObj } });
  }

// renders
  mostCommonHashtags() {
    const { data } = this.props;
    const sorted = commonSorted(data);
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

  mostPopularHashtags() {
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

  competativeLevel() {
    const { data } = this.props;
    const string = competativeScraper(data);
    const competation = string
      ? string[0].replace(`"edge_hashtag_to_media":{"count":`, "")
      : 0;

    return competation === 0 ? null : (
      <div className="result">
        <h3>Posts: {competation}</h3>
        <h4>{leveler(Number(competation))}</h4>
      </div>
    );
  }

  renderLessCompetative() {
    let custarr = Object.entries(this.state.tags).map(([key, value]) => value);
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

  spinner() {
    return <img className="spinner" src={spinner} alt="loading..." />;
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
        {isFecthing ? null : this.mostPopularHashtags()}
        {isFecthing ? this.spinner() : this.mostCommonHashtags()}
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
