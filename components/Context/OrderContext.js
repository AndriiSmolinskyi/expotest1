import React, { createContext, useState } from 'react';

const OrderContext = createContext();

const OrderProvider = ({ children }) => {
    const [ userData, setUserData ] = useState(null);
    const [ auth, setAuth ] = useState(null);
    const [ request, setRequest ] = useState(null);
    const [ uid, setUid ] = useState(null);

    const clearOrderData = () => {
        setUserData(null);
        setAuth(null);
        setRequest(null);
        setUid(null);
      };

    return (
        <OrderContext.Provider value={{ userData, setUserData, auth, setAuth, request, setRequest, uid, setUid, clearOrderData }}>
        {children}
        </OrderContext.Provider>
    );
};

export { OrderContext, OrderProvider };