import React from "react";

import PhylloSDK from "./phylloSDK";


const Home = () => {
  const phylloSDK = new PhylloSDK();

  const handleGetStarted = async () => {
    await phylloSDK.openPhylloSDK();
  };

  return (
    <div>
  
      <div className="home-container">
        <h1>Get Started With Phyllo</h1>
        <button className="home-button" onClick={handleGetStarted}>
          Get Started
        </button>
      </div>
    </div>
  );
};

export default Home;