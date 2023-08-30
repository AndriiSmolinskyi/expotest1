import React, { createContext, useState } from 'react';

const ServiceContext = createContext();

const ServiceProvider = ({ children }) => {
  const [service, setService] = useState([]);
  const [comment, setComment] = useState(null);
  const [payment, setPayment] = useState(null);

  return (
    <ServiceContext.Provider value={{ service, setService, comment, setComment, payment, setPayment }}>
      {children}
    </ServiceContext.Provider>
  );
};

export { ServiceContext, ServiceProvider };