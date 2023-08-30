import React, { createContext, useState } from 'react';

const GeoContext = createContext();

const GeoProvider = ({ children }) => {
  const [startCoords, setStartCoords] = useState(null);
  const [endCoords, setEndCoords] = useState(null);

  const clearGeoCoords = () => {
    setStartCoords(null);
    setEndCoords(null);
  };

  return (
    <GeoContext.Provider value={{ startCoords, setStartCoords, endCoords, setEndCoords, clearGeoCoords }}>
      {children}
    </GeoContext.Provider>
  );
};

export { GeoContext, GeoProvider };