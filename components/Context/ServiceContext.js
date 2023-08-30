import React, { createContext, useState } from 'react';

const ServiceContext = createContext();

const ServiceProvider = ({ children }) => {
  const [service, setService] = useState([]);
  const [comment, setComment] = useState(null);
  const [payment, setPayment] = useState(null);

  const clearServiceData = () => {
    setService([]);
    setComment(null);
    setPayment(null);
  };

  return (
    <ServiceContext.Provider value={{ service, setService, comment, setComment, payment, setPayment, clearServiceData }}>
      {children}
    </ServiceContext.Provider>
  );
};

export { ServiceContext, ServiceProvider };