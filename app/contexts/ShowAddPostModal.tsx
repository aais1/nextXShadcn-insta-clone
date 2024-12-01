"use client"
import { createContext, useContext } from "react";
import { useState } from "react";

const ShowAddPostModalContext = createContext(false);

export const ShowAddPostModalProvider = ({ children }:{children:React.ReactNode}) => {
    const [showAddPostModal, setShowAddPostModal] = useState(false);
    return (
        <ShowAddPostModalContext.Provider value={{ showAddPostModal, setShowAddPostModal }}>
            {children}
        </ShowAddPostModalContext.Provider>
    )
}

export const useShowAddPostModalContext = () => {
    const context = useContext(ShowAddPostModalContext);
  
    if (!context) {
      throw new Error(
        "useShowAddPostModalContext must be used within a ShowAddPostModalProvider"
      );
    }
  
    return context;
  };