import React, { createContext, useState } from 'react';

const GeoAdressContext = createContext();

const GeoAdressProvider = ({ children }) => {
  const [startLocation, setStartLocation] = useState(null);
  const [endLocation, setEndLocation] = useState(null);

  return (
    <GeoAdressContext.Provider value={{ startLocation, setStartLocation, endLocation, setEndLocation }}>
      {children}
    </GeoAdressContext.Provider>
  );
};

export { GeoAdressContext, GeoAdressProvider };