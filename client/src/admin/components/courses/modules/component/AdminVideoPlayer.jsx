import React from "react";
import ReactPlayer from "react-player";

export default function AdminVideoPlayer({ link }) {
  return (
    <div>
      <ReactPlayer url={link} controls width="100%" height="auto" />
    </div>
  );
}
