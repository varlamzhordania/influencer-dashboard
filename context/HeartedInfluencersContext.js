import React, { createContext, useContext, useState } from 'react';

const HeartedInfluencersContext = createContext();

export const HeartedInfluencersProvider = ({ children }) => {

  const [heartedInfluencers, setHeartedInfluencers] = useState([]);

  const addHeartedInfluencer = (influencer) => {
    setHeartedInfluencers([...heartedInfluencers, influencer]);
  };

  const removeHeartedInfluencer = (influencerId) => {
    const updatedHeartedInfluencers = heartedInfluencers.filter(
      (influencer) => influencer.id !== influencerId
    );
    setHeartedInfluencers(updatedHeartedInfluencers);
  };

  return (
    <HeartedInfluencersContext.Provider
      value={{
        heartedInfluencers,
        addHeartedInfluencer,
        removeHeartedInfluencer,
      }}
    >
      {children}
    </HeartedInfluencersContext.Provider>
  );
};


export const useHeartedInfluencers = () => {
  const context = useContext(HeartedInfluencersContext);
  if (!context) {
    throw new Error(
      'useHeartedInfluencers must be used within a HeartedInfluencersProvider'
    );
  }
  return context;
};
