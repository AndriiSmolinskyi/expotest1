import React, { createContext, useState } from 'react';

const OrderContext = createContext();

const OrderProvider = ({ children }) => {
    const [ userData, setUserData ] = useState(null);
    const [ auth, setAuth ] = useState(null);
    const [ request, setRequest ] = useState(null);
    const [ uid, setUid ] = useState(null);

    return (
        <OrderContext.Provider value={{ userData, setUserData, auth, setAuth, request, setRequest, uid, setUid }}>
        {children}
        </OrderContext.Provider>
    );
};

export { OrderContext, OrderProvider };


      // const requestToOrder = {
      //   tariff: tarOr,
      //   comm: comment,
      //   pay: payment,
      //   taxiCol: 0,
      //   serviceAdd: service,   
      //   road: [
      //     {"name":startLocation.name,"lat":startLocation.lat, "lng":startLocation.lng},
      //     {"name":endLocation.name,"lat":endLocation.lat, "lng":endLocation.lng}
      //   ]
      // }

      // setRequest(requestToOrder)