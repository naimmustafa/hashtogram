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
import Builder from "./Components/Builder";
import Spinner from "./Components/Spinner";
import TabBar from "./Components/TabBar";
// import MostCommonHashtags from "./Components/MostCommonHashtags"

// npm imports
import { Helmet } from "react-helmet";

// helpers
import { sortData } from "../../utils/scrapers/sorting";

// assest
import { FaSistrix } from "react-icons/fa";

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
            {isFecthing ? <Spinner /> : <FaSistrix />}
          </button>
        </div>
        <TabBar
          data={data}
          activeTab={activeTab}
          builder={builder}
          changeTab={type => this.setState({ activeTab: type })}
        />
        <Builder
          builder={builder}
          activeTab={activeTab}
          removeTag={tags => this.setState({ bulder: tags })}
          clearTags={() => this.setState({ builder: [] })}
        />
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
