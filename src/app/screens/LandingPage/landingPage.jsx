import React, { Component } from "react";
import { Link } from "react-router-dom";
import VideoBack from "./components/backgroundVideo.jsx";
import "./landing.css";

class Landing extends Component {
  render() {
    return (
      <div className="container">
        <VideoBack />
        <div className="content">
          <h1 className="landing-title">Find Better Hashtags for Instagram</h1>
          <Link
            to={"/search"}
          >
            <button className="engine-button">Find Now</button>
          </Link>
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
