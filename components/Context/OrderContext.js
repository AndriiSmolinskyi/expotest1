import React, { createContext, useState } from 'react';

const OrderContext = createContext();

const OrderProvider = ({ children }) => {
    const [ userData, setUserData ] = useState(null);
    const [ auth, setAuth ] = useState(null);
    const [ request, setRequest ] = useState(null);
    const [ uid, setUid ] = useState(null);
    const [ status, setStatus ] = useState(null)

    const clearOrderData = () => {
        setUserData(null);
        setAuth(null);
        setRequest(null);
        setUid(null);
      };

    return (
        <OrderContext.Provider value={{ userData, setUserData, auth, setAuth, request, setRequest, uid, setUid, clearOrderData, status, setStatus }}>
        {children}
        </OrderContext.Provider>
    );
};

export { OrderContext, OrderProvider };