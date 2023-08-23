import React, { createContext, useState } from 'react';

const GeoContext = createContext();

const GeoProvider = ({ children }) => {
  const [startCoords, setStartCoords] = useState(null);
  const [endCoords, setEndCoords] = useState(null);

  return (
    <GeoContext.Provider value={{ startCoords, setStartCoords, endCoords, setEndCoords }}>
      {children}
    </GeoContext.Provider>
  );
};

export { GeoContext, GeoProvider };