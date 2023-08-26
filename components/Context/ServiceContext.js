import React, { createContext, useState } from 'react';

const ServiceContext = createContext();

const ServiceProvider = ({ children }) => {
  const [service, setService] = useState([]);

  return (
    <ServiceContext.Provider value={{ service, setService }}>
      {children}
    </ServiceContext.Provider>
  );
};

export { ServiceContext, ServiceProvider };