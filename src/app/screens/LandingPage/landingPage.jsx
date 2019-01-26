import React, { Component } from "react";
import { Link } from "react-router-dom";
import VideoBack from "./components/backgroundVideo.jsx";
import { TiSocialInstagram } from "react-icons/ti";

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
        <VideoBack />
        <div className="content">
          <h1 className="landing-title">Find Better Hashtags for Instagram</h1>
          <Link to={"/search"}>
            <button className="engine-button">
              <TiSocialInstagram /> Find Now <TiSocialInstagram />
            </button>
          </Link>
        </div>
        <div
          className="content"
          id="amzn-assoc-ad-1af49800-edac-4f01-a470-1cc6c951472d"
        >
          {" "}
        </div>
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
