import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actions from "../../utils/actions";
import "./mainSearch.css";

import {
  Builder,
  CompetitionLevel,
  MostCommonHashtags,
  MostPopularHashtags,
  Photos,
  SearchedTags,
  SearchBar,
  TabBar
} from "./Components";

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

  handleSearch(tag) {
    const { actions } = this.props;
    actions.fetchData(tag);
    actions.sendSearchData(tag);
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
        <div className="page-header">
          <p style={{fontSize: '8px'}}>version: 0.41</p>
          <h1 className="landing-content">Hashtogram </h1>
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
        <SearchBar
          word={word}
          isFecthing={isFecthing}
          searchWord={word => actions.searchWord(word)}
          handleSearch={word => this.handleSearch(word)}
        />
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
