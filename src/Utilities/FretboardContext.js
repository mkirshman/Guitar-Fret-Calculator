//setting up global state and context for output from BasicFretDistaceCalculator component
import { createContext, useContext, useState } from 'react';

const FretboardContext = createContext();

export function useFretboard() {
  return useContext(FretboardContext);
}

export function FretboardProvider({ children }) {
  const [fretDistances, setFretDistances] = useState([]);

  const storeFretDistances = (distances) => {
    setFretDistances(distances);
  };

  return (
    <FretboardContext.Provider value={{ fretDistances, storeFretDistances }}>
      {children}
    </FretboardContext.Provider>
  );
}