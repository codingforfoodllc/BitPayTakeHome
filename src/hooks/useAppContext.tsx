import { useContext } from "react";
import { AppContext } from "../context/AppContext";

const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("AppContext must be within AppProvider");
  }

  return context;
};

export default useAppContext;
