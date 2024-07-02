import React, { createContext, useContext, useRef } from 'react';

// Create a context
const ObjectRefsContext = createContext();

export const ObjectRefsProvider = ({ children }) => {
  const objectRefs = useRef([]);
  return (
    <ObjectRefsContext.Provider value={objectRefs}>
      {children}
    </ObjectRefsContext.Provider>
  );
};

export const useObjectRefs = () => useContext(ObjectRefsContext);
