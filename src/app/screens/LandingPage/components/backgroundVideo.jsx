import React from 'react';
import video from "../video.mp4";

const VideoBack = () => {
  return (
    <video className="background-video" autoPlay={true} loop muted>
      <source src={video} type="video/mp4" />
    </video>
  )
}

export default VideoBack;
