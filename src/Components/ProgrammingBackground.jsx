// ProgrammingEmojiRain.jsx
import React from "react";
import "./ProgrammingBackground.css";

const ProgrammingEmojiRain = () => {
  return (
    <div id="background">
      {[...Array(40)].map((_, i) => (
        <div key={i}>
          <span></span>
        </div>
      ))}
    </div>
  );
};

export default ProgrammingEmojiRain;
