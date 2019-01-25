import React, { Component } from "react";
import { FaSistrix } from "react-icons/fa";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actions from "../../utils/actions";
import _ from "lodash";
import "./mainSearch.css";

class MainSearch extends Component {
  shuffle(array) {
    let currentIndex = array.length,
      temporaryValue,
      randomIndex;
    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  }

  filterHashtags() {
    const { data } = this.props;
    const re = new RegExp("(?:^|[ ])#([a-zA-Z0-9]+)", "g");
    const match = data.match(re);
    const shuff = match !== null ? this.shuffle(match) : null;
    const unique = [...new Set(match)];
    const sorted = _.chunk(unique, 30).map(item => {
      return item;
    });
      // redux edits
    return sorted.map((item, index) => {
      if (data.length > 0 && item.length === 30) {
        return (
          <div key={index} className="result">
            <p>{item}</p>
          </div>
        );
      } else {
        return null;
      }
    });
  }

  filterImages() {
    const { data } = this.props;
    const re = new RegExp(
      "(http(s?):)([/_=?|.|\\w||\\s|-])*\\640x640([/_=?|.|\\w||\\s|-])*\\.(?:jpg|gif|png)([/_=?|.|\\w||\\s|-])*\\.(?:com)",
      "g"
    );
    if (data.length > 0) {
      const links = data.match(re);
      const unique = [...new Set(links)];
      return unique.map((image, index) => (
        <a href={image} key={index} target={image}>
          <img className="instagram-images" src={image} alt="" />
        </a>
      ));
    }
    return null;
  }

  render() {
    const { actions, word } = this.props;
    return (
      <div className="search-bar-container">
        <iframe
          title="ad"
          src="//rcm-na.amazon-adsystem.com/e/cm?o=1&p=48&l=ur1&category=amazonhomepage&f=ifr&linkID=62fceacb788872fad3450c6b0761396e&t=dropexapp-20&tracking_id=dropexapp-20"
          width="728"
          height="90"
          scrolling="no"
          style={{ border: "none" }}
        />
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
                ? () => actions.fetchData(word)
                : () => alert("type something")
            }
          >
            <FaSistrix />
          </button>
        </div>
        {this.filterHashtags()}
        <div className="result">{this.filterImages()}</div>
        <button type="button" onClick={() => actions.addFetch()}>press</button>
        <iframe
          className="bottom-ad"
          title="bottom-ad"
          src="//rcm-na.amazon-adsystem.com/e/cm?o=1&p=288&l=ur1&category=gift_certificates&banner=1ZMTYQQCPDNJYWMYWR82&f=ifr&linkID=700324b3e7fcb3e33bc8b9f2e3693d85&t=dropexapp-20&tracking_id=dropexapp-20"
          width="320"
          height="50"
          scrolling="no"
          style={{ border: "none" }}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    data: state.data.data,
    word: state.data.word
  };
};

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainSearch);
