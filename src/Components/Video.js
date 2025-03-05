import React from 'react';

const Video = () => {
  return (
    <div>
      <video width="600" controls>
        <source src="/videoplayback.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
}

export default Video;
