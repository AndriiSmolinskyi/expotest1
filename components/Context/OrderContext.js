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