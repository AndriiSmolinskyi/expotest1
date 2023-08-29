import React, { createContext, useState } from 'react';

const CommentContext = createContext();

const CommentProvider = ({ children }) => {
  const [comment, setComment] = useState(null);

  return (
    <CommentContext.Provider value={{ comment, setComment }}>
      {children}
    </CommentContext.Provider>
  );
};

export { CommentContext, CommentProvider };