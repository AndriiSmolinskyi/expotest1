import React, { createContext, useState } from 'react';

const GeoAdressContext = createContext();

const GeoAdressProvider = ({ children }) => {
  const [startLocation, setStartLocation] = useState(null);
  const [endLocation, setEndLocation] = useState(null);

  const clearGeoData = () => {
    setStartLocation(null);
    setEndLocation(null);
  };
  

  return (
    <GeoAdressContext.Provider value={{ startLocation, setStartLocation, endLocation, setEndLocation, clearGeoData }}>
      {children}
    </GeoAdressContext.Provider>
  );
};

export { GeoAdressContext, GeoAdressProvider };