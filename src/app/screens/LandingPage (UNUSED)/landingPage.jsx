import React, { Component } from "react";
import { Link } from "react-router-dom";
import VideoBack from "./components/backgroundVideo.jsx";
import { TiSocialInstagram } from "react-icons/ti";
import { Helmet } from "react-helmet";

import "./landing.css";

class Landing extends Component {
  componentDidMount() {
    const script = document.createElement("script");

    script.src =
      "//z-na.amazon-adsystem.com/widgets/onejs?MarketPlace=US&adInstanceId=1af49800-edac-4f01-a470-1cc6c951472d";
    script.async = true;

    document.body.appendChild(script);
  }
  render() {
    return (
      <div className="container">
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
        <VideoBack />
        <div className="content">
          <h1 className="landing-title">Find Better Hashtags for Instagram</h1>
          <Link to={"/search"}>
            <button className="engine-button">
              <TiSocialInstagram /> Find Now <TiSocialInstagram />
            </button>
          </Link>
        </div>
        <div id="amzn-assoc-ad-1af49800-edac-4f01-a470-1cc6c951472d" />
        <div className="content">
          <p className="landing-content">
            This is an search engine that filters best performing hashtags for
            your posts.
          </p>
        </div>
      </div>
    );
  }
}

export default Landing;
