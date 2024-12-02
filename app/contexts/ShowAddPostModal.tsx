"use client"
import { createContext, useContext } from "react";
import { useState } from "react";

type ShowAddPostModalContextType={
    showAddPostModal:boolean;
    setShowAddPostModal:React.Dispatch<React.SetStateAction<boolean>>;
}

const ShowAddPostModalContext = createContext<ShowAddPostModalContextType | undefined>(undefined);

export const ShowAddPostModalProvider = ({ children }:{children:React.ReactNode}) => {
    const [showAddPostModal, setShowAddPostModal] = useState<boolean>(false);
    return (
        <ShowAddPostModalContext.Provider value={{ showAddPostModal, setShowAddPostModal }}>
            {children}
        </ShowAddPostModalContext.Provider>
    )
}

export const useShowAddPostModalContext = () : ShowAddPostModalContextType => {
    const context = useContext(ShowAddPostModalContext);
  
    if (!context) {
      throw new Error(
        "useShowAddPostModalContext must be used within a ShowAddPostModalProvider"
      );
    }
  
    return context;
  };