import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actions from "../../utils/actions";
import "./mainSearch.css";

// components

import SearchedTags from "./Components/SearchedTags";
import MostCommonHashtags from "./Components/MostCommonHashtags";
import MostPopularHashtags from "./Components/MostPopularHashtags";
import Photos from "./Components/Photos";
import CompetitionLevel from "./Components/CompetitionLevel";
// import MostCommonHashtags from "./Components/MostCommonHashtags"

// npm imports
import { CopyToClipboard } from "react-copy-to-clipboard";
import { Helmet } from "react-helmet";
import _ from "lodash";

// helpers
import {
  sortData,
  leveler,
  findLessCompetativeSort
} from "../../utils/scrapers/sorting";
import { competativeScraper } from "../../utils/scrapers/hashtagArray";

// assest
import { ClipLoader } from "react-spinners";
import { FaSistrix } from "react-icons/fa";
import { FiPlusCircle, FiMinusCircle } from "react-icons/fi";

// Component
class MainSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tags: {},
      count: 0,
      time: 20,
      showMostSearched: false,
      builder: [],
      activeTab: "popular"
    };
  }

  componentDidMount() {
    const { actions } = this.props;
    actions.getSearchData();
  }

  // functions

  handleSearch(tag) {
    const { actions } = this.props;
    actions.fetchData(tag);
    actions.sendSearchData(tag);
  }

  searchAll() {
    const { data, actions } = this.props;
    const sorted = sortData(data);
    if (data.length > 0) {
      actions.fetchDatas(sorted[this.state.count]);
    }
    return null;
  }

  addRemoveTagstoBuilder(tag) {
    const { builder } = this.state;
    const tags = builder;
    if (builder.includes(tag) || builder.length === 30) {
      let index = tags.indexOf(tag);
      tags.splice(index, 1);
      this.setState({ builder: tags });
    } else {
      this.setState({ builder: [...builder, tag] });
    }
  }

  // renders

  renderLessCompetative() {
    const { pagesAll, competeTags } = this.props;
    const { builder } = this.state;
    const newObj =
      pagesAll.length > 0 ? findLessCompetativeSort(pagesAll, competeTags) : {};
    let custarr = Object.entries(newObj).map(([key, value]) => value);
    const sorted = _.chunk(custarr, 30).map(item => {
      return item;
    });
    return sorted.map((item, index) =>
      custarr.length > 0 ? (
        <div key={index} className="result">
          <h3>Best</h3>
          {item.map((tag, index) =>
            tag !== "undefined" ? (
              <button
                className="builder-buttons"
                key={index}
                onClick={() =>
                  builder.includes(tag) || builder.length === 30
                    ? null
                    : this.setState({ builder: [...builder, tag] })
                }
              >
                {tag} <FiPlusCircle />
              </button>
            ) : null
          )}
        </div>
      ) : null
    );
  }

  renderBuilder() {
    const { builder } = this.state;
    const tags = builder;
    return builder.length > 0 ? (
      <div className="result">
        <h3>Builder {builder.length}</h3>
        {builder.map((tag, index) =>
          tag !== "undefined" ? (
            <button
              className="builder-buttons"
              key={index}
              onClick={() => {
                let index = tags.indexOf(tag);
                tags.splice(index, 1);
                this.setState({ builder: tags });
              }}
            >
              {tag} <FiMinusCircle />
            </button>
          ) : null
        )}
        <div>
          <CopyToClipboard
            text={builder.join().replace(/[ ]*,[ ]*|[ ]+/g, " ")}
          >
            <button className="copy">Copy Tags</button>
          </CopyToClipboard>
          <button
            className="copy"
            onClick={() => this.setState({ builder: [] })}
          >
            Clear All
          </button>
        </div>
      </div>
    ) : (
      <div className="result">
        <h3>Builder</h3>
        <p>Added tags will be displayed here</p>
      </div>
    );
  }

  spinner() {
    return <ClipLoader size={18} color={"white"} />;
  }

  render() {
    const { actions, word, isFecthing, data, hashtagsData } = this.props;
    const { activeTab, builder, showMostSearched } = this.state;
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

          <div className="hashtag-data">
            <button
              className="hashtag-data-title"
              onClick={() =>
                this.setState({
                  showMostSearched: !this.state.showMostSearched
                })
              }
            >
              Most Searched Tags
            </button>
            {showMostSearched === true ? (
              <div>
                <p>{hashtagsData.length} times users searched for hashtags</p>
                <ul>
                  <SearchedTags
                    hashtagsData={hashtagsData}
                    actions={actions}
                    close={() => this.setState({ showMostSearched: false })}
                  />
                </ul>
              </div>
            ) : null}
          </div>
        </div>
        <div className="content-container">
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
            {isFecthing ? this.spinner() : <FaSistrix />}
          </button>
        </div>
        {data.length > 0 ? (
          <div className="tab">
            <button
              className="tablinks"
              style={activeTab === "popular" ? { backgroundColor: "#ddd" } : {}}
              onClick={() => this.setState({ activeTab: "popular" })}
            >
              Popular Tags
            </button>
            <button
              className="tablinks"
              style={
                activeTab === "mostused" ? { backgroundColor: "#ddd" } : {}
              }
              onClick={() => this.setState({ activeTab: "mostused" })}
            >
              Most Used Tags
            </button>
            <button
              className="tablinks"
              style={activeTab === "builder" ? { backgroundColor: "#ddd" } : {}}
              onClick={() => this.setState({ activeTab: "builder" })}
            >
              Builder {builder.length > 0 ? builder.length : null}
            </button>
          </div>
        ) : null}
        {activeTab === "popular" ? this.renderLessCompetative() : null}
        {activeTab === "builder" ? this.renderBuilder() : null}
        <CompetitionLevel
          data={data}
          isFecthing={isFecthing}
          activeTab={activeTab}
        />
        <MostPopularHashtags
          data={data}
          builder={builder}
          activeTab={activeTab}
          isFecthing={isFecthing}
          addRemoveTagstoBuilder={tag => this.addRemoveTagstoBuilder(tag)}
        />
        <MostCommonHashtags
          data={data}
          builder={builder}
          activeTab={activeTab}
          isFecthing={isFecthing}
          addRemoveTagstoBuilder={tag => this.addRemoveTagstoBuilder(tag)}
        />
        <div className="result">
          <Photos data={data} isFecthing={isFecthing} activeTab={activeTab} />
        </div>
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
